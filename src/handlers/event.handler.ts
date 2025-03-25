import ELogStatus from "@enums/ELogStatus.js";
import CatchError from "@classes/CatchError.js";
import Handler from "@templates/Handler.js";
import { readdir } from "node:fs/promises";
import type { IEventFile, TEventFunc } from "@interfaces/eventFile.js";
import TBotClient from "@interfaces/botClient.js";
import EEventType from "@enums/EEventType.js";
import { GuildQueueEvent } from "discord-player";
import {
  fileExtension,
  isProduction,
  relativeSourcePath,
  sourcePath,
} from "@root/helpers.js";
import path from "node:path";

export default new Handler({
  /**
   * Handler name
   *
   * @type {string}
   */
  name: "event",

  /**
   * Handler function
   *
   * @type {THandlerFunc}
   */
  run: async (client: TBotClient): Promise<void> => {
    try {
      const registerEventFile = async (filePath: string, fileName: string) => {
        client.logStatus(fileName, "Event", ELogStatus.LOADING);

        try {
          const mergedPath = path.join(
            filePath,
            `${fileName}.event.${fileExtension}`
          );
          const relativePath = (isProduction ? "../" : "") + mergedPath;
          const event: IEventFile = await import(relativePath)
            .then((module) => module.default)
            .catch((error) => {
              console.log(error);
            });
          if (!event.name) {
            client.logStatus(fileName, "Event", ELogStatus.ERROR);
            return;
          }

          client.events.set(event.name, event);

          switch (event.type) {
            case EEventType.INTERACTION:
            case EEventType.CLIENT:
              client.on(event.name, (...args: any[]) => {
                (event.run as TEventFunc)(client, ...args);
              });
              break;
            case EEventType.PLAYER:
              client.player.events.on(
                event.name as GuildQueueEvent,
                (queue: any, track: any) => event.run(client, queue, track)
              );
              break;
            default:
              throw new Error("Invalid event type");
          }

          client.logStatus(
            `${fileName} (${event.name})`,
            "Event",
            ELogStatus.SUCCESS
          );
        } catch {
          client.logStatus(fileName, "Event", ELogStatus.ERROR);
        }
      };

      const readEventsRecursively = async (dir: string) => {
        const entries = await readdir(dir, { withFileTypes: true });
        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);

          if (entry.isDirectory()) {
            await readEventsRecursively(fullPath);
          } else if (
            entry.isFile() &&
            entry.name.endsWith(`.${fileExtension}`)
          ) {
            const fileName = entry.name.split(".")[0];
            const relativePath = path
              .join(relativeSourcePath, fullPath.replace(sourcePath, ""))
              .replace(entry.name, "");
            await registerEventFile(relativePath, fileName);
          }
        }
      };

      await readEventsRecursively(`${sourcePath}/events`);
    } catch (error) {
      CatchError.print(error);
    }
  },
});

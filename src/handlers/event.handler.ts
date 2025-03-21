import ELogStatus from "@enums/ELogStatus.js";
import CatchError from "@classes/CatchError.js";
import Handler from "@templates/Handler.js";
import { readdir } from "node:fs/promises";
import type { IEventFile, TEventFunc } from "@interfaces/eventFile.js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import TBotClient from "@interfaces/botClient.js";
import EEventType from "@enums/EEventType.js";
import { GuildQueueEvent } from "discord-player";

const __dirname = path.resolve(fileURLToPath(import.meta.url) + "/../../");
const __filename = path.basename(fileURLToPath(import.meta.url));

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
          const event: IEventFile = await import(filePath).then(
            (module) => module.default
          );
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

      const events = await readdir(`${__dirname}/events`);
      const extension = __filename.split(".").pop();
      const filteredEvents = events.filter((file) =>
        file.endsWith(`.${extension}`)
      );
      await Promise.all(
        filteredEvents.map((file) => {
          const fileName = file.split(".")[0];
          registerEventFile(`../events/${file}`, fileName);
        })
      );

      const subDirectories = events.filter(
        (file) => !file.endsWith(`.${extension}`)
      );
      for (const subDirectory of subDirectories) {
        const subFiles = await readdir(`${__dirname}/events/${subDirectory}`);
        const filteredSubFiles = subFiles.filter((file) =>
          file.endsWith(`.${extension}`)
        );
        await Promise.all(
          filteredSubFiles.map((file) => {
            const fileName = file.split(".")[0];
            return registerEventFile(
              `../events/${subDirectory}/${file}`,
              fileName
            );
          })
        );
      }
    } catch (error) {
      CatchError.print(error);
    }
  },
});

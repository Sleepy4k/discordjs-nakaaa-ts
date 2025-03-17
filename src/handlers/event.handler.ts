import ELogStatus from "@enums/ELogStatus.js";
import CatchError from "@classes/CatchError.js";
import Handler from "@templates/Handler.js";
import { readdir } from "node:fs/promises";
import type { IEventFile } from "@interfaces/eventFile.js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import TBotClient from "@interfaces/botClient.js";

const __dirname = path.resolve(fileURLToPath(import.meta.url) + "/../../");
const __filename = path.basename(fileURLToPath(import.meta.url));

export default new Handler({
  name: "event",

  run: async (client: TBotClient): Promise<void> => {
    try {
      const events = await readdir(`${__dirname}/events`);
      const extension = path.extname(__filename);
      const filteredEvents = events.filter((file) => file.endsWith(extension));

      await Promise.all(filteredEvents.map(async (filteredEvent) => {
        const [fileName] = filteredEvent.split(".");
        client.logStatus(fileName, "Event", ELogStatus.LOADING);
        try {
          const event: IEventFile = (await import(`../events/${filteredEvent}`)).default;

          if (!event.name) {
            client.logStatus(fileName, "Event", ELogStatus.ERROR);
          } else {
            client.events.set(event.name, event);
            client.on(event.name, (...args) => event.run(client, ...args));
            client.logStatus(`${fileName} (${event.name})`, "Event", ELogStatus.SUCCESS);
          }
        } catch {
          client.logStatus(fileName, "Event", ELogStatus.ERROR);
        }
      }));
    } catch (error) {
      CatchError.print(error);
    }
  }
});

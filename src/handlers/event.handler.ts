import ELogStatus from "@enums/ELogStatus.js";
import CatchError from "@classes/CatchError.js";
import Bot from "@modules/bot.js";
import Handler from "@templates/handler.js";
import { readdir } from "node:fs/promises";
import type { IEventFile } from "@interfaces/eventFile.js";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.resolve(fileURLToPath(import.meta.url) + "/../../");
const __filename = path.basename(fileURLToPath(import.meta.url));

export default new Handler({
  name: "event",

  run: async (client: Bot): Promise<void> => {
    try {
      const events = await readdir(`${__dirname}/events`);
      const extension = __filename.split(".").pop();
      const filteredEvents = events.filter((file) => file.endsWith(`.${extension}`));

      await Promise.all(filteredEvents.map(async (filteredEvent) => {
        const fileName = filteredEvent.split(".");
        client.logStatus(fileName[0], "Event", ELogStatus.LOADING);
        const event: IEventFile = await import(`../events/${fileName[0]}.${fileName[1]}`)
          .then((event) => event.default)
          .catch((_err) => {
            return { name: null };
          });

        if (!event.name) client.logStatus(fileName[0], "Event", ELogStatus.ERROR);
        else {
          client.events.set(event.name, event);
          client.on(event.name, (...args) => event.run(client, ...args));
          client.logStatus(`${fileName[0]} (${event.name})`, "Event", ELogStatus.SUCCESS);
        }
      }));
    } catch (error: unknown) {
      CatchError.print(error);
    }
  }
});
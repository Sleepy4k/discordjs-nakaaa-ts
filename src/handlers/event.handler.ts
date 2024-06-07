/**
 * Coding service by Sleepy4k <sarahpalastring@gmail.com>
 *
 * Reselling this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * Written by:
 * Apri Pandu Wicaksono
 *
 * Link: https://github.com/sleepy4k
 *
 * March 12, 2023
 */
import { Bot } from "@core/bot";
import { ELogStatus } from "@enums";
import { Handler } from "@templates";
import { IEventFile } from "@interfaces";
import { readdir } from "node:fs/promises";
import CatchError from "@classes/CatchError";

export default new Handler({
  name: "event",

  run: async (client: Bot): Promise<void> => {
    try {
      const events = await readdir("./src/events");
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

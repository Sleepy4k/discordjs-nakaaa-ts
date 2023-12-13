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
import print from "@utils/print";
import { Bot } from "@server/bot";
import { Event } from "@templates";
import { EPrintType } from "@enums";
import { ActivityType, Events } from "discord.js";

export default new Event({
  name: Events.ClientReady,

  run: async (client: Bot) => {
    if (!client.user) return;

    print(`${client.user.tag} : Ready to serve ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);

    try {
      client.user.setPresence({
        activities: [{
          name: client.config.activity.description,
          type: ActivityType.Watching
        }],
        status: client.config.activity.type
      });
    } catch (error: unknown) {
      if (error instanceof Error) print(error.message, EPrintType.ERROR);
      else if (typeof error === "string") print(error, EPrintType.ERROR);
      else print("Unknown error", EPrintType.ERROR);
    }
  }
});

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
import { ActivityType } from "discord.js";

export default {
  name: "ready",

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
      if (error instanceof Error) print(error.message, "error");
      else if (typeof error === "string") print(error, "error");
      else print("Unknown error", "error");
    }
  }
}

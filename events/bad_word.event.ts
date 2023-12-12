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
import { Message } from "discord.js";

export default {
  name: "messageCreate",

  run: async (client: Bot, message: Message) => {
    if (message.author.bot || !message.guild || !message.id) return;

    const { list, enable } = client.config.bad_words;
    if (!enable) return;

    list.forEach(async (badword: string) => {
      if (!message.content.match(badword)) return;

      print(`Deleted message from ${message.author.tag} (${message.author.id}) because it contains bad word`, "info");

      const reply = await message.reply({
        content: `Hey ${message.author}, you can't say that!`,
        allowedMentions: {
          repliedUser: true
        }
      }).catch((error: unknown) => {
        if (error instanceof Error) print(error.message, "error");
        else if (typeof error === "string") print(error, "error");
        else print("Unknown error", "error");
      });

      await message.delete().catch((error: unknown) => {
        if (error instanceof Error) print(error.message, "error");
        else if (typeof error === "string") print(error, "error");
        else print("Unknown error", "error");
      });

      if (reply) setTimeout(async () => {
        await reply.delete().catch((error: unknown) => {
          if (error instanceof Error) print(error.message, "error");
          else if (typeof error === "string") print(error, "error");
          else print("Unknown error", "error");
        });
      }, 3000);

      return;
    });
  }
}
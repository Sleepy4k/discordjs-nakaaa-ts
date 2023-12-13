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
import { Events, Message } from "discord.js";

export default new Event({
  name: Events.MessageCreate,

  run: async (client: Bot, message: Message) => {
    if (message.author.bot || !message.guild || !message.id) return;

    const { list, enable } = client.config.bad_words;
    if (!enable) return;

    list.forEach(async (badword: string) => {
      if (!message.content.match(badword)) return;

      print(`Deleted message from ${message.author.tag} (${message.author.id}) because it contains bad word`, EPrintType.INFO);

      await message.delete();

      return await client.sendEmbed(message, {
        title: "Bad Word Detected",
        description: `Hey ${message.author}, you can't say that!`,
        footer: client.getFooter(message)
      }).then((msg) => setTimeout(() => msg.delete(), 2500)).catch((error: unknown) => {
        if (error instanceof Error) print(error.message, EPrintType.ERROR);
        else if (typeof error === "string") print(error, EPrintType.ERROR);
        else print("Unknown error", EPrintType.ERROR);
      });
    });
  }
});

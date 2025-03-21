import print from "@utils/print.js";
import BadWordConfig from "@config/bad-words.js";
import TBotClient from "@interfaces/botClient.js";
import Event from "@templates/Event.js";
import { Events, Message } from "discord.js";
import EPrintType from "@enums/EPrintType.js";

export default new Event({
  /**
   * Event name
   *
   * @type {string|Events}
   */
  name: Events.MessageCreate,

  /**
   * Event function
   *
   * @type {TEventFunc|TPlayerFunc}
   */
  run: async (client: TBotClient, message: Message) => {
    if (message.author.bot || !message.guild || !message.id) return;

    const { enabled, words } = BadWordConfig;
    if (!enabled) return;

    const splitRegex = /\b|\s+/;
    const content = message.content.toLowerCase();
    const messageWords = content.split(splitRegex);
    const badWords = messageWords.filter((word) => words.includes(word));
    if (badWords.length === 0) return;

    const mergedWords = badWords.join(", ");
    const logMessage = `(${message.author.id}) used bad words (${mergedWords}) in ${message.guild.id}`;
    print(EPrintType.INFO, logMessage);

    await message.delete();
    await client.sendEmbed(message, {
      color: "Red",
      title: "Please don't swear!",
      description: `Hey ${message.author}, please don't use bad words in this server.`,
      footer: client.getFooter(message),
    });
  },
});

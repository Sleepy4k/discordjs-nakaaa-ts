import Command from "@templates/Command.js";
import { ChatInputCommandInteraction, Message } from "discord.js";
import TBotClient from "@interfaces/botClient.js";
import { getHumanReadableDate } from "@utils/parse.js";
import EmojiConfig from "@config/emojis.js";

export default new Command({
  /**
   * Event name
   * @type {string}
   */
  name: "uptime",

  /**
   * If enable slash command
   * @type {boolean}
   */
  enableSlash: true,

  /**
   * Event name alias
   * @type {string | string[]}
   */
  aliases: [
    "up",
    "up-time",
    "up-time-bot",
    "uptime-bot",
    "bot-uptime",
    "botuptime",
    "uptimebot",
  ],

  /**
   * Event description
   * @type {string}
   */
  description: "Show bot uptime.",

  /**
   * Event category
   * @type {string}
   */
  category: "misc",

  /**
   * Event cooldown
   * @type {number}
   */
  cooldown: 5,

  /**
   * Event function
   * @type {TCommandFunc}
   */
  run: async (
    client: TBotClient,
    interaction: Message | ChatInputCommandInteraction,
    _args: any[],
    _prefix: string
  ) => {
    const ephemeral = interaction instanceof ChatInputCommandInteraction;

    await client.sendEmbed(
      interaction,
      {
        color: "Blue",
        title: `${EmojiConfig.clock} Uptime`,
        description: `\`\`\`Uptime: ${getHumanReadableDate(
          client.uptime!
        )}\`\`\``,
        footer: client.getFooter(interaction),
      },
      ephemeral
    );
  },
});

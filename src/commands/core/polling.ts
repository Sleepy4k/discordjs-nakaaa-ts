import TBotClient from "@interfaces/botClient.js";
import EmojiConfig from "@config/emojis.js";
import ESlashOpt from "@enums/ESlashOpt.js";
import Command from "@templates/Command.js";
import { ChatInputCommandInteraction, Message } from "discord.js";

export default new Command({
  /**
   * Event name
   * @type {string}
   */
  name: "polling",

  /**
   * If enable slash command
   * @type {boolean}
   */
  enableSlash: true,

  /**
   * Event name alias
   * @type {string | string[]}
   */
  aliases: ["poll", "vote", "voting"],

  /**
   * Event description
   * @type {string}
   */
  description: "Make a polling.",

  /**
   * Event category
   * @type {string}
   */
  category: "core",

  /**
   * Event cooldown
   * @type {number}
   */
  cooldown: 5,

  /**
   * Event options
   * @type {Array<object>}
   */
  options: [
    {
      name: "polling",
      description: "Polling question.",
      type: ESlashOpt.STRING,
      required: true,
    },
  ],

  /**
   * Event function
   * @type {TCommandFunc}
   */
  run: async (
    client: TBotClient,
    interaction: Message | ChatInputCommandInteraction,
    args: any[],
    prefix: string
  ) => {
    const ephemeral = interaction instanceof ChatInputCommandInteraction;
    const polling = ephemeral
      ? interaction.options.getString("polling", true)
      : args?.join(" ")?.toLowerCase();

    if (!polling) {
      client.sendEmbed(
        interaction,
        {
          color: "Red",
          title: "Polling",
          description: `\`\`\`Usage: ${prefix}polling <polling>\`\`\``,
          footer: client.getFooter(interaction),
        },
        ephemeral
      );
      return;
    }

    const poll = await client.sendEmbed(
      interaction,
      {
        color: "Gold",
        title: "Polling",
        description: `\`\`\`${polling}\`\`\``,
        footer: client.getFooter(interaction),
      },
      false,
      true
    );

    if ("react" in poll) {
      await poll.react(EmojiConfig.thumbsUp);
      await poll.react(EmojiConfig.thumbsDown);
      return;
    }

    client.sendEmbed(
      interaction,
      {
        color: "Red",
        title: "Something went wrong!",
        description: "Polling message is not a message!",
        footer: client.getFooter(interaction),
      },
      ephemeral
    );
  },
});

import TBotClient from "@interfaces/botClient.js";
import ESlashOpt from "@enums/ESlashOpt.js";
import Command from "@templates/Command.js";
import { ChatInputCommandInteraction, Message } from "discord.js";

export default new Command({
  /**
   * Event name
   * @type {string}
   */
  name: "say",

  /**
   * If enable slash command
   * @type {boolean}
   */
  enableSlash: true,

  /**
   * Event name alias
   * @type {string | string[]}
   */
  aliases: ["echo", "print"],

  /**
   * Event description
   * @type {string}
   */
  description: "Make the bot say something.",

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
      name: "text",
      description: "Text to say.",
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
    const say = ephemeral
      ? interaction.options.getString("text", true)
      : args?.join(" ")?.toLowerCase();

    if (!say) {
      await client.sendEmbed(
        interaction,
        {
          color: "Red",
          title: "Say",
          description: `\`\`\`Usage: ${prefix}say <text>\`\`\``,
          footer: client.getFooter(interaction),
        },
        ephemeral
      );
      return;
    }

    await client.sendEmbed(
      interaction,
      {
        color: "Navy",
        description: `\`\`\`${say}\`\`\``,
        footer: client.getFooter(interaction, true),
      },
      false
    );
  },
});
import Command from "@templates/Command.js";
import { ChatInputCommandInteraction, Message } from "discord.js";
import EmojiConfig from "@config/emojis.js";
import TBotClient from "@interfaces/botClient.js";

export default new Command({
  /**
   * Event name
   * @type {string}
   */
  name: "ping",

  /**
   * If enable slash command
   * @type {boolean}
   */
  enableSlash: true,

  /**
   * Event name alias
   * @type {string | string[]}
   */
  aliases: ["pong", "latency", "lat"],

  /**
   * Event description
   * @type {string}
   */
  description: "Show your ping to the bot.",

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
    const latency = Date.now() - interaction.createdTimestamp;
    const apiLatency = Math.round(client.ws.ping);

    await client.sendEmbed(
      interaction,
      {
        color: "Blue",
        title: `${EmojiConfig.pingPong} Pong!`,
        description: `\`\`\`Latency: ${latency}ms\nAPI Latency: ${apiLatency}ms\`\`\``,
        footer: client.getFooter(interaction),
      },
      ephemeral
    );
  },
});

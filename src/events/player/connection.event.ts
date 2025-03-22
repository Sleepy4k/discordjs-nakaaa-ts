import { TPlayerQueue } from "@interfaces/eventFile.js";
import TBotClient from "@interfaces/botClient.js";
import Event from "@templates/Event.js";
import { GuildQueueEvent, Track } from "discord-player";
import EEventType from "@enums/EEventType.js";
import { ChatInputCommandInteraction } from "discord.js";

export default new Event({
  /**
   * Event name
   *
   * @type {string|Events}
   */
  name: GuildQueueEvent.Connection,

  /**
   * Event type
   *
   * @type {EEventType|typeof EEventType}
   */
  type: EEventType.PLAYER,

  /**
   * Event function
   *
   * @type {TEventFunc|TPlayerFunc}
   */
  run: async (client: TBotClient, queue: TPlayerQueue, _track: Track) => {
    const { interaction } = queue.metadata;
    if (!interaction) return;

    const ephemeral = interaction instanceof ChatInputCommandInteraction;

    await client.sendEmbed(
      interaction,
      {
        color: "Fuchsia",
        title: "Connected to the voice channel",
        description: `\`\`\`Connected to the voice channel (${queue.channel?.toString()})\`\`\``,
        footer: client.getFooter(interaction),
      },
      ephemeral
    );
  },
});

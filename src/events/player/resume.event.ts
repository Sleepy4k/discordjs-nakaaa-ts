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
  name: GuildQueueEvent.PlayerResume,

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

    await client.sendEmbed(interaction, {
      color: "Navy",
      title: "Music resumed",
      description: `\`\`\`Current track is resumed\`\`\``,
      footer: client.getFooter(interaction),
    },
    ephemeral);
  },
});

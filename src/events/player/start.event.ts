import { TPlayerQueue } from "@interfaces/eventFile.js";
import TBotClient from "@interfaces/botClient.js";
import Event from "@templates/Event.js";
import { GuildQueueEvent, Track } from 'discord-player';
import EEventType from "@enums/EEventType.js";

export default new Event({
  /**
   * Event name
   *
   * @type {string|Events}
   */
  name: GuildQueueEvent.PlayerStart,

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
  run: async (client: TBotClient, queue: TPlayerQueue, track: Track) => {
    const { interaction } = queue.metadata;
    if (!interaction) return;

    await client.sendEmbed(interaction, {
      color: "Green",
      title: "Here comes the music",
      description: `\`\`\`Track started - [${track.title}](${track.url})\`\`\``,
      footer: client.getFooter(interaction),
    });
  },
});

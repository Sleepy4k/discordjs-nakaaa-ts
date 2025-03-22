import Command from "@templates/Command.js";
import { ChatInputCommandInteraction, Message } from "discord.js";
import TBotClient from "@interfaces/botClient.js";
import CatchError from "@classes/CatchError.js";
import { QueueRepeatMode, useQueue } from "discord-player";

export default new Command({
  /**
   * Event name
   * @type {string}
   */
  name: "skip",

  /**
   * If enable slash command
   * @type {boolean}
   */
  enableSlash: true,

  /**
   * Event name alias
   * @type {string | string[]}
   */
  aliases: ["s", "skip-song", "next", "next-song"],

  /**
   * Event description
   * @type {string}
   */
  description: "Skip the current song.",

  /**
   * Event category
   * @type {string}
   */
  category: "music",

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
    const guild = interaction.guild;
    const member = interaction.member;
    const ephemeral = interaction instanceof ChatInputCommandInteraction;

    if (!guild) {
      await client.sendEmbed(
        interaction,
        {
          color: "Red",
          title: "Error",
          description: "```We can't find your guild data!```",
          footer: client.getFooter(interaction),
        },
        ephemeral
      );
      return;
    }

    if (!member) {
      await client.sendEmbed(
        interaction,
        {
          color: "Red",
          title: "Error",
          description: "```We can't find your member data!```",
          footer: client.getFooter(interaction),
        },
        ephemeral
      );
      return;
    }

    if (!("voice" in member)) {
      await client.sendEmbed(
        interaction,
        {
          color: "Red",
          title: "Error",
          description: "```Something went wrong! Voice data not found!```",
          footer: client.getFooter(interaction),
        },
        ephemeral
      );
      return;
    }

    if (!member.voice.channelId) {
      await client.sendEmbed(
        interaction,
        {
          color: "Red",
          title: "Error",
          description:
            "```You must be in a voice channel to use this command!```",
          footer: client.getFooter(interaction),
        },
        ephemeral
      );
      return;
    }

    if (!member.voice.channel) {
      await client.sendEmbed(
        interaction,
        {
          color: "Red",
          title: "Error",
          description:
            "```You must be in a voice channel to use this command!```",
          footer: client.getFooter(interaction),
        },
        ephemeral
      );
      return;
    }

    try {
      const queue = useQueue(guild.id);
      if (!queue || !queue.isPlaying()) {
        await client.sendEmbed(
          interaction,
          {
            color: "Red",
            title: "Error",
            description: "```There is no song that I could skip!```",
            footer: client.getFooter(interaction),
          },
          ephemeral
        );
        return;
      }

      if (queue.isEmpty() && queue.repeatMode !== QueueRepeatMode.AUTOPLAY) {
        await client.sendEmbed(
          interaction,
          {
            color: "Red",
            title: "Error",
            description: "```There is no song that I could skip!```",
            footer: client.getFooter(interaction),
          },
          ephemeral
        );
        return;
      }

      queue.node.skip();
    } catch (error) {
      CatchError.print(error);
    }
  },
});

import Command from "@templates/Command.js";
import { ChatInputCommandInteraction, Message } from "discord.js";
import TBotClient from "@interfaces/botClient.js";
import CatchError from "@classes/CatchError.js";
import { useMainPlayer } from "discord-player";

export default new Command({
  /**
   * Event name
   * @type {string}
   */
  name: "join",

  /**
   * If enable slash command
   * @type {boolean}
   */
  enableSlash: true,

  /**
   * Event name alias
   * @type {string | string[]}
   */
  aliases: ["connect", "summon"],

  /**
   * Event description
   * @type {string}
   */
  description: "Let the bot join your voice channel.",

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

    if (guild.members.me?.voice.channel) {
      if (guild.members.me.voice.channelId === member.voice.channelId) {
        await client.sendEmbed(
          interaction,
          {
            color: "Red",
            title: "Error",
            description: "```I'm already in your voice channel!```",
            footer: client.getFooter(interaction),
          },
          ephemeral
        );
        return;
      }

      await client.sendEmbed(
        interaction,
        {
          color: "Red",
          title: "Error",
          description: "```I'm already in a voice channel!```",
          footer: client.getFooter(interaction),
        },
        ephemeral
      );
      return;
    }

    try {
      const player = useMainPlayer();
      const queue = player.queues.create(guild.id, {
        volume: 50,
        leaveOnEmpty: false,
        leaveOnEnd: false,
        leaveOnStop: false,
        metadata: {
          interaction: interaction,
          channel: interaction.channel,
        },
        selfDeaf: true,
      });

      await queue.connect(member.voice.channelId);
    } catch (error) {
      CatchError.print(error);
    }
  },
});

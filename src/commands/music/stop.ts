import Command from "@templates/Command.js";
import { ChatInputCommandInteraction, Message } from "discord.js";
import TBotClient from "@interfaces/botClient.js";
import CatchError from "@classes/CatchError.js";
import { useQueue } from "discord-player";

export default new Command({
  /**
   * Event name
   * @type {string}
   */
  name: "stop",

  /**
   * If enable slash command
   * @type {boolean}
   */
  enableSlash: true,

  /**
   * Event name alias
   * @type {string | string[]}
   */
  aliases: ["stop-music", "end", "end-music"],

  /**
   * Event description
   * @type {string}
   */
  description: "Stop the music.",

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
      if (!queue) {
        await client.sendEmbed(interaction, {
          color: "Red",
          title: "Error",
          description: "```Queue not found!```",
          footer: client.getFooter(interaction),
        });
        return;
      }

      queue.node.stop(true);

      await client.sendEmbed(interaction, {
        color: "Green",
        title: "Success",
        description: "```The music has been stopped!```",
        footer: client.getFooter(interaction),
      });
    } catch (error) {
      CatchError.print(error);
    }
  },
});

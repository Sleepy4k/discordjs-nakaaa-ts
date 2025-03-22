import Command from "@templates/Command.js";
import { ChatInputCommandInteraction, Message } from "discord.js";
import TBotClient from "@interfaces/botClient.js";
import ESlashOpt from "@enums/ESlashOpt.js";
import CatchError from "@classes/CatchError.js";
import { useMainPlayer } from "discord-player";

export default new Command({
  /**
   * Event name
   * @type {string}
   */
  name: "play",

  /**
   * If enable slash command
   * @type {boolean}
   */
  enableSlash: true,

  /**
   * Event name alias
   * @type {string | string[]}
   */
  aliases: ["p", "play-song", "playsong"],

  /**
   * Event description
   * @type {string}
   */
  description: "Play a song.",

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
   * Event options
   * @type {Array<object>}
   */
  options: [
    {
      name: "search",
      description:
        "The song you want to play, you can use a link or song name.",
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
    _prefix: string
  ) => {
    const guild = interaction.guild;
    const member = interaction.member;
    const ephemeral = interaction instanceof ChatInputCommandInteraction;
    const song = ephemeral
      ? interaction.options.getString("search", true)
      : args?.join(" ")?.toLowerCase();

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

    if (!song) {
      await client.sendEmbed(
        interaction,
        {
          color: "Red",
          title: "Error",
          description: "```Please provide a song name or url to play.```",
          footer: client.getFooter(interaction),
        },
        ephemeral
      );
      return;
    }

    try {
      const player = useMainPlayer();
      const searchMessage = await client.sendEmbed(
        interaction,
        {
          color: "Yellow",
          title: "Searching...",
          description: "```Searching for the song...```",
          footer: client.getFooter(interaction),
        },
        ephemeral
      );

      const result = await player.search(song).finally(async () => {
        if (!ephemeral) await searchMessage.delete();
      });
      if (!result || !result.hasTracks()) {
        await client.sendEmbed(
          interaction,
          {
            color: "Red",
            title: "Error",
            description: "```No results found!```",
            footer: client.getFooter(interaction),
          },
          ephemeral
        );
        return;
      }

      await player.play(member.voice.channelId, result, {
        nodeOptions: {
          volume: 50,
          leaveOnEmpty: false,
          leaveOnEnd: false,
          leaveOnStop: false,
          metadata: {
            interaction: interaction,
            channel: interaction.channel,
          },
        },
        connectionOptions: {
          deaf: true,
        },
      });
    } catch (error) {
      CatchError.print(error);
    }
  },
});

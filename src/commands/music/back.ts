import Command from "@templates/Command.js";
import { ChatInputCommandInteraction, Message } from "discord.js";
import TBotClient from "@interfaces/botClient.js";
import CatchError from "@classes/CatchError.js";
import { useHistory } from "discord-player";

export default new Command({
  /**
   * Event name
   * @type {string}
   */
  name: "back",

  /**
   * If enable slash command
   * @type {boolean}
   */
  enableSlash: true,

  /**
   * Event name alias
   * @type {string | string[]}
   */
  aliases: ["b", "back-song", "backsong"],

  /**
   * Event description
   * @type {string}
   */
  description: "Go back to the previous song.",

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
      const history = useHistory();

      if (history?.isEmpty()) {
        await client.sendEmbed(interaction, {
          color: "Red",
          title: "We can't see any history",
          description: "```There is no previous song to go back!```",
          footer: client.getFooter(interaction)
        });
      }

      const searchMessage = await client.sendEmbed(interaction, {
        color: "Yellow",
        title: "Searching...",
        description: "```Searching for the previous song...```",
        footer: client.getFooter(interaction),
      });

      await history?.previous();

      searchMessage.delete();
      await client.sendEmbed(interaction, {
        color: "Green",
        title: "Success",
        description: "```Went back to previous song```",
        footer: client.getFooter(interaction),
      })
    } catch (error) {
      CatchError.print(error);
    }
  },
});

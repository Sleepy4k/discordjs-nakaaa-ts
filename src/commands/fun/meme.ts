import Command from "@templates/Command.js";
import { ChatInputCommandInteraction, Message } from "discord.js";
import TBotClient from "@interfaces/botClient.js";
import CatchError from "@classes/CatchError.js";
import axiosInstance from "@services/axiosInstance.js";

export default new Command({
  /**
   * Event name
   * @type {string}
   */
  name: "meme",

  /**
   * If enable slash command
   * @type {boolean}
   */
  enableSlash: true,

  /**
   * Event name alias
   * @type {string | string[]}
   */
  aliases: ["meme-image", "meme-img", "memes"],

  /**
   * Event description
   * @type {string}
   */
  description: "Give you a random meme.",

  /**
   * Event category
   * @type {string}
   */
  category: "fun",

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

    const api = axiosInstance("https://meme-api.com");

    api
      .get("/gimme")
      .then(async (response) => {
        const meme = response.data;
        const length = meme.preview.length;

        await client.sendEmbed(
          interaction,
          {
            color: "Aqua",
            title: `Random Meme (${meme.title})`,
            image: meme.preview[length - 1],
            footer: client.getFooter(interaction),
          },
          ephemeral
        );
      })
      .catch(async (error: unknown) => {
        CatchError.print(error);

        await client.sendEmbed(
          interaction,
          {
            color: "Red",
            title: "Error",
            description: "Something went wrong, please try again later.",
            footer: client.getFooter(interaction),
          },
          ephemeral
        );
      });
  },
});

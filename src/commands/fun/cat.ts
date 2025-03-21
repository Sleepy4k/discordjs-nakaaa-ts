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
  name: "cat",

  /**
   * If enable slash command
   * @type {boolean}
   */
  enableSlash: true,

  /**
   * Event name alias
   * @type {string | string[]}
   */
  aliases: ["cat-image", "cat-img", "kucing"],

  /**
   * Event description
   * @type {string}
   */
  description: "Show random cat image.",

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

    const api = axiosInstance("https://api.thecatapi.com/v1");

    api
      .get("/images/search")
      .then(async (response) => {
        const { url } = response.data[0];

        await client.sendEmbed(interaction, {
          color: "Aqua",
          title: "Cute Cat",
          image: url,
          footer: client.getFooter(interaction)
        }, ephemeral);
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

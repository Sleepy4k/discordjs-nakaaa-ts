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
  name: "joke",

  /**
   * If enable slash command
   * @type {boolean}
   */
  enableSlash: true,

  /**
   * Event name alias
   * @type {string | string[]}
   */
  aliases: ["dad-joke", "dadjoke", "jokes"],

  /**
   * Event description
   * @type {string}
   */
  description: "Give you a dad joke and keep reminder, it's just a dad joke.",

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

    const api = axiosInstance("https://api.dadjokes.io/api");

    api
      .get("/random/joke")
      .then(async (response) => {
        const joke = response.data.body[0];

        await client.sendEmbed(
          interaction,
          {
            color: "DarkAqua",
            title: "Dad Joke",
            description: `\`\`\`${joke.setup}\n\n${joke.punchline}\`\`\``,
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

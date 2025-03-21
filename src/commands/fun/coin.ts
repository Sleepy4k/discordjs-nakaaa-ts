import Command from "@templates/Command.js";
import { ChatInputCommandInteraction, Message } from "discord.js";
import TBotClient from "@interfaces/botClient.js";
import ESlashOpt from "@enums/ESlashOpt.js";

export default new Command({
  /**
   * Event name
   * @type {string}
   */
  name: "coin",

  /**
   * If enable slash command
   * @type {boolean}
   */
  enableSlash: true,

  /**
   * Event name alias
   * @type {string | string[]}
   */
  aliases: ["flip", "flip-coin", "flipcoin", "uang-koin", "koin"],

  /**
   * Event description
   * @type {string}
   */
  description: "Flip a coin and show your luck.",

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
   * Event options
   * @type {Array<object>}
   */
  options: [
    {
      name: "guess",
      description: "Your guess",
      type: ESlashOpt.STRING,
      choices: [
        { name: "Heads", value: "heads" },
        { name: "Tails", value: "tails" },
      ],
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
    prefix: string
  ) => {
    const validAnswer = ["heads", "tails"];
    const result = Math.floor(Math.random() * 2);
    const ephemeral = interaction instanceof ChatInputCommandInteraction;
    const answer = ephemeral
      ? interaction.options.getString("guess", true)
      : args?.join(" ")?.toLowerCase();

    if (!answer || !validAnswer.includes(answer)) {
      await client.sendEmbed(
        interaction,
        {
          color: "Red",
          title: "Coin flip",
          description: `\`\`\`Usage: ${prefix}coin <Heads/Tails>\`\`\``,
          footer: client.getFooter(interaction),
        },
        ephemeral
      );
      return;
    }

    const coin = result === 0 ? "heads" : "tails";

    if (coin === answer) {
      await client.sendEmbed(
        interaction,
        {
          color: "Green",
          title: "Coin flip",
          description: `\`\`\`Result: ${coin} \nGuess: ${answer} \nStatus: You win!\`\`\``,
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
        title: "Coin flip",
        description: `\`\`\`Result: ${coin} \nGuess: ${answer} \nStatus: You lose!\`\`\``,
        footer: client.getFooter(interaction),
      },
      ephemeral
    );
  },
});

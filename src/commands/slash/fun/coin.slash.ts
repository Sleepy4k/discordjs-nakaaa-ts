/**
 * Coding service by Sleepy4k <sarahpalastring@gmail.com>
 *
 * Reselling this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * Written by:
 * Apri Pandu Wicaksono
 *
 * Link: https://github.com/sleepy4k
 *
 * March 12, 2023
 */
import { Bot } from "@core/bot";
import { ESlashOpt } from "@enums";
import { Command } from "@templates";
import main from "@functions/fun/coin.func";
import { Message, PermissionFlagsBits, ApplicationCommandType, ChatInputCommandInteraction } from "discord.js";

export default new Command({
  /**
   * Event name
   * @type {string}
   */
  name: "coin",

  /**
   * Event description
   * @type {string}
   */
  description: "Flip a coin.",

  /**
   * Event user permissions
   * @type {bigint}
   */
  userPermissions: PermissionFlagsBits.SendMessages,

  /**
   * Event bot permissions
   * @type {bigint}
   */
  botPermissions: PermissionFlagsBits.SendMessages,

  /**
   * Event category
   * @type {string}
   */
  category: "fun",

  /**
   * Event type
   * @type {ApplicationCommandType}
   */
  type: ApplicationCommandType.ChatInput,

  /**
   * Event options
   * @type {Array<object>}
   */
  options: [{
    name: "guess",
    description: "Your guess",
    type: ESlashOpt.STRING,
    choices: [
      { name: "Heads", value: "heads" },
      { name: "Tails", value: "tails" }
    ],
    required: true
  }],

  /**
   * Event function
   * @type {TCommandFunc}
   */
  run: async (client: Bot, interaction: Message | ChatInputCommandInteraction, args: any[], prefix: string) => {
    await main({ client, interaction, args, prefix });
  }
});

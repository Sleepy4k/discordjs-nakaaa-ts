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
import { Command } from "@templates";
import main from "@functions/fun/joke.func";
import { Message, PermissionFlagsBits, ChatInputCommandInteraction } from "discord.js";

export default new Command({
  /**
   * Event name
   * @type {string}
   */
  name: "joke",

  /**
   * Event name alias
   * @type {string | string[]}
   */
  alias: ["dad-joke", "dadjoke", "jokes"],

  /**
   * Event description
   * @type {string}
   */
  description: "Give you a dad joke.",

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
   * Event cooldown
   * @type {number}
   */
  cooldown: 5,

  /**
   * Event function
   * @type {TCommandFunc}
   */
  run: async (client: Bot, interaction: Message | ChatInputCommandInteraction, args: any[], prefix: string) => {
    await main({ client, interaction, args, prefix });
  }
});

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
import { Message, CommandInteraction } from "discord.js";

interface ICommandParam {
  /**
   * @type {Bot}
   */
  client: Bot;

  /**
   * @type {CommandInteraction | Message}
   */
  interaction: CommandInteraction | Message;

  /**
   * @type {string}
   */
  args?: string[];

  /**
   * @type {string}
   */
  prefix?: string;
}

export default ICommandParam;

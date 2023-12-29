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
import { Message, ChatInputCommandInteraction } from "discord.js";

/**
 * Command function
 *
 * @param {Bot} client
 * @param {Message | ChatInputCommandInteraction} interaction
 * @param {string[]} args
 * @param {string} prefix
 *
 * @returns {Promise<void>}
 */
type TCommandFunc = (client: Bot, interaction: Message | ChatInputCommandInteraction, args: string[], prefix: string) => Promise<void>;

export default TCommandFunc;

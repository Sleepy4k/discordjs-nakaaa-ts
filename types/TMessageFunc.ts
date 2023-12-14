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
import { Bot } from "@server/bot";
import { Message, ChatInputCommandInteraction } from "discord.js";

type TMessageFunc = (client: Bot, interaction: Message | ChatInputCommandInteraction, args: string[], prefix: string) => Promise<void>;

export default TMessageFunc;

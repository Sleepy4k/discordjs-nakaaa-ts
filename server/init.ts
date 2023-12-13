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
import { Bot } from "./bot";
import createServer from "@dashboard/bin/www";

/**
 * Initialize the bot
 *
 * @type {Bot}
 */
const client: Bot = new Bot();

/**
 * Initialize chatbot AI
 *
 * @type {Promise<void>}
 */
client.initChatbot();

/**
 * Initialize the server
 *
 * @type {createServer}
 */
createServer(client);

/**
 * Build the bot
 *
 * @type {Promise<void>}
 */
client.build(client.config.bot.token).catch((err) => console.error(err));

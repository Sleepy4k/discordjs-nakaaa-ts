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

/**
 * Handler function
 *
 * @param {Bot} client
 *
 * @returns {Promise<void>}
 */
type THandlerFunc = (client: Bot) => Promise<void>;

export default THandlerFunc;

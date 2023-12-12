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
import "dotenv/config.js";

const bot = {
  name: process.env.BOT_NAME || "Sleepy4k",
  icon: process.env.BOT_ICON || "https://i.imgur.com/8Q9ZQ2M.png",
  token: process.env.BOT_TOKEN || "",
  prefix: process.env.BOT_PREFIX || "$",
  author: process.env.BOT_AUTHOR || "benjamin4k",
  browser: process.env.BOT_BROWSER || "Discord iOS"
}

export default bot;

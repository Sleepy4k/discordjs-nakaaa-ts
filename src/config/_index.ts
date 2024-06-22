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
import web from "./web.config";
import bot from "./bot.config";
import emoji from "./emoji.config";
import slash from "./slash.config";
import filter from "./filter.config";
import genius from "./genius.config";
import chatbot from "./chatbot.config";
import handler from "./handler.config";
import activity from "./activity.config";
import bad_words from "./bad_words.config";
import anti_crash from "./anti_crash.config";

const config = {
  bot,
  web,
  emoji,
  slash,
  filter,
  genius,
  chatbot,
  handler,
  activity,
  bad_words,
  anti_crash
};

export default config;

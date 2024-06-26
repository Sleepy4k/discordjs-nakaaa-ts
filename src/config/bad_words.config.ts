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

const bad_words = {
  enable: process.env.BAD_WORDS_ENABLE || false,
  list: [
    "anjing",
    "babi",
    "bangsat",
    "kontol",
    "memek",
    "puki",
    "ngentot",
    "goblok",
    "tolol",
    "bego",
    "bejat",
    "bacot",
    "asu",
    "nenen",
    "ngewe",
  ]
}

export default bad_words;

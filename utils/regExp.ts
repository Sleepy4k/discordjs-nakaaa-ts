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
import type { TRegExp } from "@types";

/**
 * RegExp
 *
 * @param {string} word
 *
 * @returns {string}
 */
const regExp: TRegExp = (word: string): string => {
  return word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

export default regExp;

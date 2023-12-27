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
import type { TParseDur } from "@types";

/**
 * Parse duration to human readable
 *
 * @param {number} ms
 *
 * @returns {string}
 */
const parseDur: TParseDur = (ms: number): string => {
  let seconds = Math.floor(ms / 1000);

  const days = Math.floor(seconds / 86400);
  seconds %= 86400;

  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;

  const minutes = Math.floor(seconds / 60);
  seconds %= 60;

  let result = '';

  if (days) result += `${days} day${days > 1 ? 's' : ''}, `;
  if (hours) result += `${hours} hour${hours > 1 ? 's' : ''}, `;
  if (minutes) result += `${minutes} minute${minutes > 1 ? 's' : ''}, `;

  result += `${seconds} second${seconds > 1 ? 's' : ''}`;
  return result;
}

export default parseDur;

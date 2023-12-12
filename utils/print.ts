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
import type { TPrintType } from "@types";

/**
 * Parse current date and time to human readable for console log with message
 *
 * @param {String} message
 * @param {TPrintType} type
 *
 * @returns {void}
 */
export default function print(message: string, type: TPrintType = "default"): void {
  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();

  switch (type.toLowerCase()) {
    case "error":
      console.log(`[${date} ${time}] [ERROR] ${message}`);
      break;
    case "warn":
      console.log(`[${date} ${time}] [WARN] ${message}`);
      break;
    case "debug":
      console.log(`[${date} ${time}] [DEBUG] ${message}`);
      break;
    case "info":
      console.log(`[${date} ${time}] [INFO] ${message}`);
      break;
    default:
      console.log(`[${date} ${time}] ${message}`);
      break;
  }
}

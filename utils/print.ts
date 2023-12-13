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
import { EPrintType } from "@enums";
import type { TPrint } from "@types";

/**
 * Parse current date and time to human readable for console log with message
 *
 * @param {String} message
 * @param {EPrintType} type
 *
 * @returns {void}
 */
const print: TPrint = (message: string, type: EPrintType = EPrintType.DEFAULT): void => {
  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();

  switch (type) {
    case EPrintType.ERROR:
      console.log(`[${date} ${time}] [ERROR] ${message}`);
      break;
    case EPrintType.WARN:
      console.log(`[${date} ${time}] [WARN] ${message}`);
      break;
    case EPrintType.DEBUG:
      console.log(`[${date} ${time}] [DEBUG] ${message}`);
      break;
    case EPrintType.INFO:
      console.log(`[${date} ${time}] [INFO] ${message}`);
      break;
    default:
      console.log(`[${date} ${time}] ${message}`);
      break;
  }
}

export default print;

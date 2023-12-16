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
import LogToFile from "@classes/LogToFile";

/**
 * Parse current date and time to human readable for console log with message
 *
 * @param {string} message
 * @param {EPrintType} type
 *
 * @returns {void}
 */
const print: TPrint = (message: string, type: EPrintType = EPrintType.DEFAULT): void => {
  let data;
  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();

  switch (type) {
    case EPrintType.ERROR:
      data = `[${date} ${time}] [ERROR] ${message}`;
      LogToFile.write(data, EPrintType.ERROR);
      break;
    case EPrintType.WARN:
      data = `[${date} ${time}] [WARN] ${message}`;
      LogToFile.write(data, EPrintType.WARN);
      break;
    case EPrintType.DEBUG:
      data = `[${date} ${time}] [DEBUG] ${message}`;
      LogToFile.write(data, EPrintType.DEBUG);
      break;
    case EPrintType.INFO:
      data = `[${date} ${time}] [INFO] ${message}`;
      LogToFile.write(data, EPrintType.INFO);
      break;
    default:
      data = `[${date} ${time}] ${message}`;
      LogToFile.write(data, EPrintType.DEFAULT);
      break;
  }

  console.log(data);
}

export default print;

import LogToFile from "@classes/LogToFile.js";
import EPrintType from "@enums/EPrintType.js";
import { getCurrentDateWithTime } from "./parse.js";

/**
 * Print message to console and log to file
 * @param {EPrintType} type
 * @param {string} message
 * @returns {void}
 * @example
 * ```
 * print(EPrintType.INFO, "Hello, world!");
 * ```
 */
const print = (type: EPrintType, message: string): void => {
  const currDate = getCurrentDateWithTime();
  const typeString = EPrintType[type] || EPrintType.DEFAULT;
  const data = `[${currDate}] [${typeString}] ${message}`;

  LogToFile.write(type, data);
  console.log(data);
};

export default print;

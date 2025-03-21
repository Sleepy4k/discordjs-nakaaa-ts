import EPrintType from "@enums/EPrintType.js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import FileStream from "./FileStream.js";
import { getCurrentDate } from "@utils/parse.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

class LogToFile {
  private constructor() {
    // Prevent instantiation
  }

  /**
   * Write data to log file
   * @param {EPrintType} type
   * @param {string} message
   * @returns {void}
   * @example
   * ```
   * LogToFile.write(EPrintType.INFO, "Hello, world!");
   * ```
   */
  public static write(type: EPrintType, message: string): void {
    FileStream.write(message, this.getPath(type));
  }

  /**
   * Read log file
   * @param {EPrintType} type
   * @param {string} date
   * @returns {string}
   * @example
   * ```
   * LogToFile.read(EPrintType.INFO, "2022-01-01");
   * ```
   */
  public static read(type: EPrintType, date?: string): string {
    return FileStream.read(this.getPath(type, date));
  }

  /**
   * Remove log file
   * @param {EPrintType} type
   * @param {string} date
   * @returns {void}
   * @example
   * ```
   * LogToFile.remove(EPrintType.INFO, "2022-01-01");
   * ```
   */
  public static remove(type: EPrintType, date?: string): void {
    FileStream.remove(this.getPath(type, date));
  }

  /**
   * Get log file path
   * @param {EPrintType} type
   * @param {string} date
   * @returns {string}
   * @example
   * ```
   * LogToFile.getPath(EPrintType.INFO, "2022-01-01");
   * ```
   */
  private static getPath(type: EPrintType, date: string = getCurrentDate()): string {
    const logPaths: Record<EPrintType, string> = {
      [EPrintType.ERROR]: "error",
      [EPrintType.WARN]: "warn",
      [EPrintType.DEBUG]: "debug",
      [EPrintType.INFO]: "info",
      [EPrintType.WEB]: "web",
      [EPrintType.DEFAULT]: "default"
    };

    const logPath = path.join(__dirname, "../logs", logPaths[type] || logPaths[EPrintType.DEFAULT]);
    FileStream.create(logPath);

    return path.join(logPath, `${date}.log`);
  }
}

export default LogToFile;

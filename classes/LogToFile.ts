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
import FileStream from "@classes/FileStream";

class LogToFile {
  /**
   * Date
   *
   * @type {string}
   */
  private static date: string = new Date().toISOString().split("T")[0];

  /**
   * Constructor
   */
  constructor() {
    throw new Error("This class cannot be instantiated");
  }

  /**
   * Get log path
   * 
   * @param {EPrintType} type
   * @param {string} date
   *
   * @returns {void}
   */
  private static getPath(type: EPrintType, date?: string): string {
    let logPath = `${__dirname}/../logs`;
    FileStream.create(logPath);

    switch (type) {
      case EPrintType.ERROR:
        logPath += "/error";
        break;
      case EPrintType.WARN:
        logPath += "/warn";
        break;
      case EPrintType.DEBUG:
        logPath += "/debug";
        break;
      case EPrintType.INFO:
        logPath += "/info";
        break;
      default:
        logPath += "/default";
        break;
    }

    FileStream.create(logPath);

    date === undefined ? logPath += `/${this.date}.log` : logPath += `/${date}.log`;

    return logPath;
  }

  /**
   * Write log to file
   *
   * @param {string} message
   * @param {EPrintType} type
   *
   * @returns {void}
   */
  public static write(message: string, type: EPrintType): void {
    const logPath = this.getPath(type);

    FileStream.write(message, logPath);
  }

  /**
   * Read log from file
   *
   * @param {EPrintType} type
   * @param {string} date
   *
   * @returns {string}
   */
  public static read(type: EPrintType, date?: string): string {
    const logPath = this.getPath(type, date);

    return FileStream.read(logPath);
  }

  /**
   * Delete log file
   *
   * @param {EPrintType} type
   * @param {string} date
   *
   * @returns {void}
   */
  public static delete(type: EPrintType, date?: string): void {
    const logPath = this.getPath(type, date);

    FileStream.delete(logPath);
  }
}

export default LogToFile;

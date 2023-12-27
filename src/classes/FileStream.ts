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
import fs from "fs";

class FileStream {
  /**
   * Constructor
   */
  constructor() {
    throw new Error("This class cannot be instantiated");
  }

  /**
   * Create log file
   * 
   * @param {string} file
   *
   * @returns {void}
   */
  public static create(file: string): void {
    if (!fs.existsSync(file)) fs.mkdirSync(file);
  }

  /**
   * Write log to file
   *
   * @param {string} data
   * @param {string} file
   *
   * @returns {void}
   */
  public static write(data: string, file: string): void {
    fs.appendFileSync(file, data + "\n");
  }

  /**
   * Read log from file
   * 
   * @param {string} file
   *
   * @returns {string}
   */
  public static read(file: string): string {
    if (!fs.existsSync(file)) return "";
    return fs.readFileSync(file, "utf-8");
  }

  /**
   * Delete log file
   * 
   * @param {string} file
   *
   * @returns {void}
   */
  public static delete(file: string): void {
    if (fs.existsSync(file)) fs.unlinkSync(file);
  }
}

export default FileStream;

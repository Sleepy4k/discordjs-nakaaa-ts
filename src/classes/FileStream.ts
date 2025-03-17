import fs from "node:fs";

class FileStream {
  private constructor() {
    throw new Error("This class cannot be instantiated.");
  }

  /**
   * Check if file exists
   * @param {string} file
   * @returns {boolean}
   * @example
   * ```
   * FileStream.isExists("file.txt");
   * ```
   */
  public static isExists(file: string): boolean {
    return fs.existsSync(file);
  }

  /**
   * Create file
   * @param {string} file
   * @returns {void}
   * @example
   * ```
   * FileStream.create("file.txt");
   * ```
   */
  public static create(file: string): void {
    if (this.isExists(file)) return;

    const dir = file.includes(".") ? file.split("/").slice(0, -1).join("/") : file;
    fs.mkdirSync(dir, { recursive: true });
  }

  /**
   * Write data to file
   * @param {string} data
   * @param {string} file
   * @returns {void}
   * @example
   * ```
   * FileStream.write("Hello, world!", "file.txt");
   * ```
   */
  public static write(data: string, file: string): void {
    if (!this.isExists(file)) this.create(file);
    fs.appendFileSync(file, `${data}\n`);
  }

  /**
   * Read file
   * @param {string} file
   * @returns {string}
   * @example
   * ```
   * FileStream.read("file.txt");
   * ```
   */
  public static read(file: string): string {
    return this.isExists(file) ? fs.readFileSync(file, "utf-8") : "";
  }

  /**
   * Remove file
   * @param {string} file
   * @returns {void}
   * @example
   * ```
   * FileStream.remove("file.txt");
   * ```
   */
  public static remove(file: string): void {
    if (this.isExists(file)) fs.unlinkSync(file);
  }
}

export default FileStream;

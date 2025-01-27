import fs from "node:fs";

class FileStream {
  constructor() {
    throw new Error("This class cannot be instantiated.");
  }

  public static isExists(file: string): boolean {
    return fs.existsSync(file);
  }

  public static create(file: string): void {
    if (this.isExists(file)) return;

    if (file.includes(".")) {
      file = file.split("/").slice(0, -1).join("/");
    }

    fs.mkdirSync(file, { recursive: true });
  }

  public static write(data: string, file: string): void {
    if (!this.isExists(file)) this.create(file);
    fs.appendFileSync(file, `${data}\n`);
  }

  public static read(file: string): string {
    if (!this.isExists(file)) return "";
    return fs.readFileSync(file, "utf-8");
  }

  public static remove(file: string): void {
    if (!this.isExists(file)) return;
    fs.unlinkSync(file);
  }
}

export default FileStream;

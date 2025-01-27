import EPrintType from "@enums/EPrintType.js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import FileStream from "./FileStream.js";
import { getCurrentDate } from "@utils/parse.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

class LogToFile {
  constructor() {
    throw new Error("This class cannot be instantiated.");
  }

  private static getPath(type: EPrintType, date?: string): string {
    let logPath = `${__dirname}/../logs`;

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
    case EPrintType.WEB:
      logPath += "/web";
      break;
    default:
      logPath += "/default";
      break;
    }

    FileStream.create(logPath);

    return logPath + `${date === undefined ? `/${getCurrentDate()}.log` : `/${date}.log`}`;
  }

  public static write(type: EPrintType, message: string): void {
    FileStream.write(message, this.getPath(type));
  }

  public static read(type: EPrintType, date?: string): string {
    return FileStream.read(this.getPath(type, date));
  }

  public static remove(type: EPrintType, date?: string): void {
    FileStream.remove(this.getPath(type, date));
  }
}

export default LogToFile;

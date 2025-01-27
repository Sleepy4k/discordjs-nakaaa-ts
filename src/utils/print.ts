import LogToFile from "@classes/LogToFile.js";
import EPrintType from "@enums/EPrintType.js";
import { getCurrentDateWithTime } from "./parse.js";

const print = (type: EPrintType, message: string): void => {
  let data;

  const currDate = getCurrentDateWithTime();

  switch (type) {
  case EPrintType.INFO:
    data = `[${currDate}] [INFO] ${message}`;
    LogToFile.write(EPrintType.INFO, data);
    break;
  case EPrintType.WARN:
    data = `[${currDate}] [WARN] ${message}`;
    LogToFile.write(EPrintType.WARN, data);
    break;
  case EPrintType.DEBUG:
    data = `[${currDate}] [DEBUG] ${message}`;
    LogToFile.write(EPrintType.DEBUG, data);
    break;
  case EPrintType.ERROR:
    data = `[${currDate}] [ERROR] ${message}`;
    LogToFile.write(EPrintType.ERROR, data);
    break;
  case EPrintType.WEB:
    data = `[${currDate}] [WEB] ${message}`;
    LogToFile.write(EPrintType.WEB, data);
    break;
  default:
    data = `[${currDate}] ${message}`;
    LogToFile.write(EPrintType.DEFAULT, data);
    break;
  }

  console.log(data);
};

export default print;

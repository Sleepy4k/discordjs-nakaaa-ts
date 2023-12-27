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
import LogToFile from "@classes/LogToFile";
import { Request, Response } from "express";

/**
 * Display a listing of the resource.
 *
 * @param {Request} req
 * @param {Response} res
 *
 * @return Promise<void>
 */
export async function logIndex(req: Request, res: Response): Promise<void> {
  const domain = req.protocol + "://" + req.get("host");

  res.status(200).send({
    status: "success",
    message: `Check out our log!`,
    data: {
      log: {
        error: `${domain}/api/log/error`,
        warn: `${domain}/api/log/warn`,
        debug: `${domain}/api/log/debug`,
        info: `${domain}/api/log/info`,
        default: `${domain}/api/log/default`
      }
    }
  });
}

/**
 * Display a listing of the resource.
 *
 * @param {Request} req
 * @param {Response} res
 *
 * @return Promise<void>
 */
export async function logFindByType(req: Request, res: Response): Promise<void> {
  let type;

  switch (req.params.type) {
    case "error":
      type = EPrintType.ERROR;
      break;
    case "warn":
      type = EPrintType.WARN;
      break;
    case "debug":
      type = EPrintType.DEBUG;
      break;
    case "info":
      type = EPrintType.INFO;
      break;
    default:
      type = EPrintType.DEFAULT;
      break;
  }

  const logPath = LogToFile.read(type);

  res.status(200).send({
    status: "success",
    message: `Log ${type} found!`,
    data: {
      log: logPath
    }
  });
}

/**
 * Display a listing of the resource.
 *
 * @param {Request} req
 * @param {Response} res
 *
 * @return Promise<void>
 */
export async function logFindByDate(req: Request, res: Response): Promise<void> {
  let type;

  switch (req.params.type) {
    case "error":
      type = EPrintType.ERROR;
      break;
    case "warn":
      type = EPrintType.WARN;
      break;
    case "debug":
      type = EPrintType.DEBUG;
      break;
    case "info":
      type = EPrintType.INFO;
      break;
    default:
      type = EPrintType.DEFAULT;
      break;
  }

  const logPath = LogToFile.read(type, req.params.date);

  if (!logPath) res.status(404).send({
    status: "error",
    message: `Log ${type} not found!`
  });
  else res.status(200).send({
    status: "success",
    message: `Log ${type} found!`,
    data: {
      log: logPath
    }
  });
}

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
import { print } from "@utils";
import { EPrintType } from "@enums";
import { NextFunction, Request, Response } from 'express';
import type THandlerFile from "@dashboard/types/THandlerFile";

/**
 * Set locals
 * 
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * 
 * @type {THandlerFile}
 * 
 * @returns {void}
 */
const logHandler: THandlerFile = (req: Request, res: Response, next: NextFunction): void => {
  const statusCode = String(res.statusCode);

  /**
   * Print request and log it
   */
  print(`New request to '${req.url}' using '${req.method}' method with status '${statusCode}' `, EPrintType.WEB)

  /**
   * Continue
   */
  next();
}

export default logHandler;

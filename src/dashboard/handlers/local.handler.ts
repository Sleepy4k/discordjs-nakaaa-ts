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
import { version } from "discord.js";
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
const localHandler: THandlerFile = (req: Request, res: Response, next: NextFunction): void => {
  /**
   * Set locals
   */
  res.locals.data = {};
  res.locals.discord = version;
  res.locals.node = process.version;
  res.locals.title = req.app.get("client").config.web.name;
  res.locals.author = req.app.get("client").config.bot.author;
  res.locals.baseUrl = `${req.protocol}://${req.hostname}:${req.app.get("port")}`;

  /**
   * Continue
   */
  next();
}

export default localHandler;

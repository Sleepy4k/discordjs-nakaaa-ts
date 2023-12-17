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
import { Request, Response } from "express";

/**
 * Display a listing of the resource.
 *
 * @param {Request} req
 * @param {Response} res
 *
 * @return Promise<void>
 */
export async function docIndex(req: Request, res: Response): Promise<void> {
  res.status(200);
  res.render("pages/docs", {
    title: req.app.get("client").config.web.name + " | Docs",
    frame: {
      url: "https://discord.js.org/#/docs/discord.js/14.7.1/general/welcome",
      border: "0"
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
export async function discordIndex(req: Request, res: Response): Promise<void> {
  res.status(200);
  res.render("pages/discord", {
    title: req.app.get("client").config.web.name + " | Discord",
    frame: {
      url: "https://discordjs.guide/whats-new.html#site",
      border: "0"
    }
  });
}

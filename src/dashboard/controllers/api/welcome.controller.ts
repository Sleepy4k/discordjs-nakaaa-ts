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
import { Request, Response } from "express";

/**
 * Display a listing of the resource.
 *
 * @param {Request} req
 * @param {Response} res
 *
 * @return Promise<void>
 */
async function index(req: Request, res: Response): Promise<void> {
  const client = req.app.get("client");

  res.status(200).send({
    status: "success",
    message: "Welcome to the API!",
    data: {
      discord: `v${version}`,
      node: process.version,
      title: client.config.web.name,
      events: client.events
    },
  });
}

export {
  index as welcomeIndex,
};

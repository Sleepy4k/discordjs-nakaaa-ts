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
import { parseDur } from "@utils";
import { Guild, User } from "discord.js";
import { Request, Response } from "express";

/**
 * Display a listing of the resource.
 *
 * @param {Request} req
 * @param {Response} res
 *
 * @return Promise<void>
 */
export async function guildIndex(req: Request, res: Response): Promise<void> {
  const client = req.app.get("client");

  res.status(200).send({
    status: "success",
    message: `We are now in ${client.guilds.cache.size} guilds!`,
    data: client.guilds.cache.map((guild: Guild) => guild.name)
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
export async function userIndex(req: Request, res: Response): Promise<void> {
  const client = req.app.get("client");

  res.status(200).send({
    status: "success",
    message: `We are now in ${client.users.cache.size} users!`,
    data: client.users.cache.map((user: User) => user.username)
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
export async function channelIndex(req: Request, res: Response): Promise<void> {
  const client = req.app.get("client");

  res.status(200).send({
    status: "success",
    message: `We are now in ${client.channels.cache.size} channels!`,
    data: client.channels.cache.map((channel: Guild) => channel.name)
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
export async function pingIndex(req: Request, res: Response): Promise<void> {
  const client = req.app.get("client");

  res.status(200).send({
    status: "success",
    message: `Pong! ${client.ws.ping}ms`
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
export async function uptimeIndex(req: Request, res: Response): Promise<void> {
  const client = req.app.get("client");
  const uptime = parseDur(client.uptime);

  res.status(200).send({
    status: "success",
    message: `Uptime: ${uptime}`
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
export async function inviteIndex(req: Request, res: Response): Promise<void> {
  const client = req.app.get("client");

  res.status(200).send({
    status: "success",
    message: `Invite me to your server!`,
    data: {
      invite: `https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8`
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
export async function githubIndex(_req: Request, res: Response): Promise<void> {
  res.status(200).send({
    status: "success",
    message: `Check out our github!`,
    data: {
      github: `https://github.com/sleepy4k/discordjs-nakaaa-ts`
    }
  });
}

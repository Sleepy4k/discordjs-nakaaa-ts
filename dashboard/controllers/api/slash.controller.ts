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
import { ICommandFile } from "@interfaces";
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
    message: `We have ${client.scommands.size} slash commands!`,
    data: client.scommands.map((command: ICommandFile) => command.name)
  });
}

/**
 * Display a specified resource.
 *
 * @param {Request} req
 * @param {Response} res
 *
 * @return Promise<void>
 */
async function show(req: Request, res: Response): Promise<void> {
  const client = req.app.get("client");
  const command = client.scommands.get(req.params.command);

  if (!command) res.status(404).send({
    status: "error",
    message: `Command ${req.params.command} not found!`
  });
  else res.status(200).send({
    status: "success",
    message: `Command ${req.params.command} found!`,
    data: {
      name: command.name,
      description: command.description,
      category: command.category,
      options: command.options[0]
    }
  });
}

export {
  index as slashIndex,
  show as slashShow,
};

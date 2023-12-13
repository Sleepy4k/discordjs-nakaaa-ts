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
import print from "@utils/print";
import { Bot } from "@server/bot";
import { readdir } from "node:fs/promises";
import { ICommandFile } from "@interfaces";

/**
 * Register all message commands
 *
 * @param {Bot} client
 *
 * @returns {Promise<void>}
 */
export default async function (client: Bot): Promise<void> {
  const { global, guild_id } = client.config.slash;

  try {
    let slashCommands: any = [];

    const slashDirs = await readdir("./commands/slash");

    await Promise.all(slashDirs.map(async (slashDir) => {
      if (client.config.nsfw.enable && slashDir === client.config.nsfw.directory) return;

      const slashs = await readdir(`./commands/slash/${slashDir}`);
      const filteredSlashs = slashs.filter((file) => file.endsWith(".ts"));

      filteredSlashs.map(async (filteredSlash) => {
        const fileName = filteredSlash.split(".");
        const command: ICommandFile = await import(`../commands/slash/${slashDir}/${fileName[0]}.${fileName[1]}`).then((command) => command.default);

        if (!command.name) client.logStatus(command.name, false, "Slash");
        else {
          slashCommands.push(command);
          client.scommands.set(command.name, command);
          client.logStatus(command.name, true, "Slash");
        }
      });
    }));

    client.on("ready", async (client) => {
      if (global) client.application.commands.set(slashCommands);
      else client.guilds.cache.get(guild_id)?.commands.set(slashCommands);
    });
  } catch (error: unknown) {
    if (error instanceof Error) print(error.message, "error");
    else if (typeof error === "string") print(error, "error");
    else print("Unknown error", "error");
  }
}
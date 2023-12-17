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
import { Bot } from "@server/bot";
import { ELogStatus } from "@enums";
import { Handler } from "@templates";
import { readdir } from "node:fs/promises";
import { ICommandFile } from "@interfaces";
import CatchError from "@classes/CatchError";

export default new Handler({
  name: "slash",

  run: async (client: Bot) => {
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
          client.logStatus(fileName[0], "Slash", ELogStatus.LOADING);
          const command: ICommandFile = await import(`../commands/slash/${slashDir}/${fileName[0]}.${fileName[1]}`)
            .then((command) => command.default)
            .catch((_eer) => {
              return { name: null };
            });

          if (!command.name) client.logStatus(fileName[0], "Slash", ELogStatus.ERROR);
          else {
            slashCommands.push(command);
            client.scommands.set(command.name, command);
            client.logStatus(command.name, "Slash", ELogStatus.SUCCESS);
          }
        });
      }));

      client.on("ready", async (client) => {
        if (global) client.application.commands.set(slashCommands);
        else client.guilds.cache.get(guild_id)?.commands.set(slashCommands);
      });
    } catch (error: unknown) {
      CatchError.print(error);
    }
  }
});

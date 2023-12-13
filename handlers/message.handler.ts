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
import { EPrintType } from "@enums";
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
  try {
    const commandDirs = await readdir("./commands/message");

    await Promise.all(commandDirs.map(async (commandDir) => {
      if (client.config.nsfw.enable && commandDir === client.config.nsfw.directory) return;

      const commands = await readdir(`./commands/message/${commandDir}`);
      const filteredCommands = commands.filter((file) => file.endsWith(".ts"));

      filteredCommands.map(async (filteredCommand) => {
        const fileName = filteredCommand.split(".");
        const command: ICommandFile = await import(`../commands/message/${commandDir}/${fileName[0]}.${fileName[1]}`).then((command) => command.default);

        if (!command.name) client.logStatus(command.name, false, "Message");
        else {
          client.mcommands.set(command.name, command);
          client.logStatus(command.name, true, "Message");
        }

      });
    }));
  } catch (error: unknown) {
    if (error instanceof Error) print(error.message, EPrintType.ERROR);
    else if (typeof error === "string") print(error, EPrintType.ERROR);
    else print("Unknown error", EPrintType.ERROR);
  }
}

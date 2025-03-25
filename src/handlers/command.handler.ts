import ELogStatus from "@enums/ELogStatus.js";
import Handler from "@templates/Handler.js";
import CatchError from "@classes/CatchError.js";
import { readdir } from "node:fs/promises";
import { ICommandFile } from "@interfaces/commandFile.js";
import TBotClient from "@interfaces/botClient.js";
import { Events } from "discord.js";
import {
  fileExtension,
  isProduction,
  relativeSourcePath,
  sourcePath,
} from "@root/helpers.js";
import path from "node:path";

export default new Handler({
  /**
   * Handler name
   *
   * @type {string}
   */
  name: "command",

  /**
   * Handler function
   *
   * @type {THandlerFunc}
   */
  run: async (client: TBotClient): Promise<void> => {
    let filteredSlashCommands: any = [];

    try {
      const loadMessageFile = async (filePath: string, fileName: string) => {
        client.logStatus(fileName, "Slash", ELogStatus.LOADING);
        client.logStatus(fileName, "Message", ELogStatus.LOADING);

        try {
          const mergedPath = path.join(
            filePath,
            `${fileName}.${fileExtension}`
          );
          const relativePath = (isProduction ? "../" : "") + mergedPath;
          const command: ICommandFile = await import(relativePath)
            .then((module) => module.default)
            .catch((error) => {
              console.log(error);
            });
          if (!command.name) {
            client.logStatus(fileName, "Message", ELogStatus.ERROR);
            return;
          }

          if (command.enableSlash) {
            filteredSlashCommands.push(command);
            client.slashCommands.set(command.name, command);
            client.logStatus(fileName, "Slash", ELogStatus.SUCCESS);
          }

          client.messageCommands.set(command.name, command);
          client.logStatus(
            `${fileName} (${command.name})`,
            "Message",
            ELogStatus.SUCCESS
          );

          if (!command.aliases) return;

          const aliases = Array.isArray(command.aliases)
            ? command.aliases
            : [command.aliases];
          aliases.forEach((alias) => {
            client.logStatus(
              `${alias} (${command.name})`,
              "Message",
              ELogStatus.LOADING
            );
            client.messageCommands.set(alias, command);
            client.logStatus(
              `${alias} (${command.name})`,
              "Message",
              ELogStatus.SUCCESS
            );
          });
        } catch {
          client.logStatus(fileName, "Slash", ELogStatus.ERROR);
          client.logStatus(fileName, "Message", ELogStatus.ERROR);
        }
      };

      const readCommandsRecursively = async (dir: string) => {
        const entries = await readdir(dir, { withFileTypes: true });
        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);

          if (entry.isDirectory()) {
            await readCommandsRecursively(fullPath);
          } else if (
            entry.isFile() &&
            entry.name.endsWith(`.${fileExtension}`)
          ) {
            const fileName = entry.name.split(".")[0];
            const relativePath = path
              .join(relativeSourcePath, fullPath.replace(sourcePath, ""))
              .replace(entry.name, "");
            await loadMessageFile(relativePath, fileName);
          }
        }
      };

      await readCommandsRecursively(`${sourcePath}/commands`);

      client.logStatus("Slash Registration", "Command", ELogStatus.LOADING);
      client.on(Events.ClientReady, async () => {
        await client.application?.commands.set(filteredSlashCommands);
      });
      client.logStatus("Slash Registration", "Command", ELogStatus.SUCCESS);
    } catch (error) {
      CatchError.print(error);
    }
  },
});

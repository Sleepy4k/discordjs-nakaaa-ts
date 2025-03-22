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
          const command: ICommandFile = await import(relativePath).then(
            (module) => module.default
          );
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

      const messages = await readdir(`${sourcePath}/commands`);
      const filteredMessages = messages.filter((file) =>
        file.endsWith(`.${fileExtension}`)
      );
      await Promise.all(
        filteredMessages.map((file) => {
          const fileName = file.split(".")[0];
          return loadMessageFile(
            `${relativeSourcePath}/commands/${file}`,
            fileName
          );
        })
      );

      const subDirectories = messages.filter(
        (file) => !file.endsWith(`.${fileExtension}`)
      );
      for (const subDirectory of subDirectories) {
        const subFiles = await readdir(
          `${sourcePath}/commands/${subDirectory}`
        );
        const filteredSubFiles = subFiles.filter((file) =>
          file.endsWith(`.${fileExtension}`)
        );
        await Promise.all(
          filteredSubFiles.map((file) => {
            const fileName = file.split(".")[0];
            return loadMessageFile(
              `${relativeSourcePath}/commands/${subDirectory}`,
              fileName
            );
          })
        );
      }

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

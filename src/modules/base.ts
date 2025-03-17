import fs from "node:fs";
import ClientConfig from "@config/discord-client.js";
import { Player } from "discord-music-player";
import BotClientConfig from "@config/bot-client.js";
import PlayerOptionsConfig from "@config/player-options.js";
import HandlerConfig from "@config/bot-handler.js";
import EmojiConfig from "@config/emojis.js";
import ELogStatus from "@enums/ELogStatus.js";
import print from "@utils/print.js";
import EPrintType from "@enums/EPrintType.js";
import CatchError from "@classes/CatchError.js";
import HandlerTemplate from "@templates/Handler.js";
import { Client, Collection } from "discord.js";
import TBotClient from "@interfaces/botClient.js";

const HANDLER_PATH = "./../handlers";

class Base extends Client {
  #player: Player;
  #events: Collection<string, any>;
  #cooldowns: Collection<string, any>;
  #slashCommands: Collection<string, any>;
  #messageCommands: Collection<string, any>;
  #config: typeof BotClientConfig;
  #prefix: string;
  #listOfHandlers: string[] = [];

  protected constructor(
    handlerList: string[],
    config: typeof BotClientConfig,
    playerConfig: typeof PlayerOptionsConfig
  ) {
    super(ClientConfig);

    this.#player = new Player(this as any, playerConfig);
    this.#events = new Collection();
    this.#cooldowns = new Collection();
    this.#slashCommands = new Collection();
    this.#messageCommands = new Collection();
    this.#config = config;
    this.#prefix = config.bot.prefix;
    this.#listOfHandlers = handlerList;
  }

  get player(): Player {
    return this.#player;
  }

  get events(): Collection<string, any> {
    return this.#events;
  }

  get cooldowns(): Collection<string, any> {
    return this.#cooldowns;
  }

  get slashCommands(): Collection<string, any> {
    return this.#slashCommands;
  }

  get messageCommands(): Collection<string, any> {
    return this.#messageCommands;
  }

  get config(): typeof BotClientConfig {
    return this.#config;
  }

  get prefix(): string {
    return this.#prefix;
  }

  get handlerList(): string[] {
    return [...this.#listOfHandlers];
  }

  protected async buildHandlers(): Promise<void> {
    try {
      this.#listOfHandlers.forEach(async (file) => {
        const handler: HandlerTemplate = await import(
          `${HANDLER_PATH}/${file}.handler`
        ).then((handler) => handler.default);
        this.logStatus(handler.name, "Handler", ELogStatus.LOADING);
        await handler
          .run(this as unknown as TBotClient)
          .then(() =>
            this.logStatus(handler.name, "Handler", ELogStatus.SUCCESS)
          )
          .catch(() =>
            this.logStatus(handler.name, "Handler", ELogStatus.ERROR)
          );
      });
    } catch (error) {
      CatchError.print(error);
    }
  }

  protected async clientLogin(): Promise<void> {
    await this.login(this.#config.bot.token)
      .then(() => {
        this.logStatus(
          `Logged in as ${this.user?.displayName}`,
          "Client",
          ELogStatus.SUCCESS
        );
      })
      .catch((error) => {
        this.logStatus(
          `Something went wrong: ${error}`,
          "Client",
          ELogStatus.ERROR
        );
      });
  }

  protected static async getHandlerList(): Promise<string[]> {
    this.#isHandlerDirectoryExists(HANDLER_PATH);

    const { list } = HandlerConfig;
    const handlerList: string[] = [];

    for (const handler of list) {
      const isFileExists = await this.#isHandlerExists(handler);

      if (isFileExists) {
        handlerList.push(handler);
      }
    }

    return handlerList;
  }

  static #isHandlerDirectoryExists(path: string): boolean {
    if (!path || path === "") return false;

    const isExists = fs.existsSync(path);

    try {
      if (!isExists) {
        fs.mkdirSync(path, { recursive: true });
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  static async #isHandlerExists(fileName: string): Promise<boolean> {
    if (!fileName || fileName === "") return false;

    try {
      let parsedFileName = fileName.split("/").pop();
      if (!parsedFileName) return false;

      parsedFileName = parsedFileName.replace(/\.[^/.]+$/, "");

      return await import(`${HANDLER_PATH}/${parsedFileName}.handler`)
        .then(() => true)
        .catch(() => false);
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  public logStatus(name: string, category: string, type: ELogStatus): void {
    let icon, text;

    switch (type) {
      case ELogStatus.SUCCESS:
        icon = EmojiConfig.success;
        text = "Success";
        break;
      case ELogStatus.ERROR:
        icon = EmojiConfig.error;
        text = "Error";
        break;
      case ELogStatus.LOADING:
        icon = EmojiConfig.loading;
        text = "Loading";
        break;
      default:
        icon = EmojiConfig.error;
        text = "Unknown";
        break;
    }

    print(EPrintType.INFO, `${category}: ${name} | ${icon} ${text}`);
  }
}

export default Base;

import fs from "node:fs";
import ClientConfig from "@config/discord-client.js";
import { Player } from "discord-player";
import BotClientConfig from "@config/bot-client.js";
import HandlerConfig from "@config/bot-handler.js";
import EmojiConfig from "@config/emojis.js";
import ELogStatus from "@enums/ELogStatus.js";
import print from "@utils/print.js";
import EPrintType from "@enums/EPrintType.js";
import CatchError from "@classes/CatchError.js";
import HandlerTemplate from "@templates/Handler.js";
import { Client, Collection } from "discord.js";
import TBotClient from "@interfaces/botClient.js";
import { DefaultExtractors } from "@discord-player/extractor";
import {
  fileExtension,
  isProduction,
  relativeSourcePath,
} from "@root/helpers.js";
import path from "node:path";

const HANDLER_PATH = path.join(relativeSourcePath, "handlers");

class Base extends Client {
  #player: Player;
  #events: Collection<string, any>;
  #cooldowns: Collection<string, any>;
  #slashCommands: Collection<string, any>;
  #messageCommands: Collection<string, any>;
  #config: typeof BotClientConfig;
  #prefix: string;
  #listOfHandlers: string[] = [];

  /**
   * Create a new instance of the bot
   * @param handlerList string[]
   * @param config typeof BotClientConfig
   * @returns Base
   * @example
   * ```
   * const bot = new Base(handlerList, config, playerConfig);
   * ```
   */
  protected constructor(handlerList: string[], config: typeof BotClientConfig) {
    super(ClientConfig);

    this.#player = new Player(this as any);
    this.#events = new Collection();
    this.#cooldowns = new Collection();
    this.#slashCommands = new Collection();
    this.#messageCommands = new Collection();
    this.#config = config;
    this.#prefix = config.bot.prefix;
    this.#listOfHandlers = handlerList;
  }

  /**
   * Create a getter method for player
   * @returns Player
   * @example
   * ```
   * const bot = await Bot.createInstace();
   * const player = bot.player;
   * ```
   */
  get player(): Player {
    return this.#player;
  }

  /**
   * Create a getter method for events
   * @returns Collection<string, any>
   * @example
   * ```
   * const bot = await Bot.createInstace();
   * const events = bot.events;
   * ```
   */
  get events(): Collection<string, any> {
    return this.#events;
  }

  /**
   * Create a getter method for cooldowns
   * @returns Collection<string, any>
   * @example
   * ```
   * const bot = await Bot.createInstace();
   * const cooldowns = bot.cooldowns;
   * ```
   */
  get cooldowns(): Collection<string, any> {
    return this.#cooldowns;
  }

  /**
   * Create a getter method for slashCommands
   * @returns Collection<string, any>
   * @example
   * ```
   * const bot = await Bot.createInstace();
   * const slashCommands = bot.slashCommands;
   * ```
   */
  get slashCommands(): Collection<string, any> {
    return this.#slashCommands;
  }

  /**
   * Create a getter method for messageCommands
   * @returns Collection<string, any>
   * @example
   * ```
   * const bot = await Bot.createInstace();
   * const messageCommands = bot.messageCommands;
   * ```
   */
  get messageCommands(): Collection<string, any> {
    return this.#messageCommands;
  }

  /**
   * Create a getter method for config
   * @returns typeof BotClientConfig
   * @example
   * ```
   * const bot = await Bot.createInstace();
   * const config = bot.config;
   * ```
   */
  get config(): typeof BotClientConfig {
    return this.#config;
  }

  /**
   * Create a getter method for prefix
   * @returns string
   * @example
   * ```
   * const bot = await Bot.createInstace();
   * const prefix = bot.prefix;
   * ```
   */
  get prefix(): string {
    return this.#prefix;
  }

  /**
   * Create a getter method for listOfHandlers
   * @returns string[]
   * @example
   * ```
   * const bot = await Bot.createInstace();
   * const handlers = bot.handlerList;
   * ```
   */
  get handlerList(): string[] {
    return [...this.#listOfHandlers];
  }

  /**
   * Build all the handlers
   * @returns Promise<void>
   * @example
   * ```
   * const bot = new Bot.createInstace();
   * await bot.buildHandlers();
   * ```
   */
  protected async buildHandlers(): Promise<void> {
    try {
      this.#listOfHandlers.forEach(async (file) => {
        const filePath = path.join(
          HANDLER_PATH,
          `${file}.handler.${fileExtension}`
        );
        const relativePath = (isProduction ? "../" : "") + filePath;
        const handler: HandlerTemplate = await import(relativePath).then(
          (handler) => handler.default
        );
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

  /**
   * Login into the client as a bot
   * @returns Promise<void>
   * @example
   * ```
   * const bot = await Bot.createInstace();
   * await bot.clientLogin();
   * ```
   */
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

  /**
   * Load the player extractors
   * @returns Promise<void>
   * @example
   * ```
   * const bot = await Bot.createInstace();
   * await bot.loadPlayerExtractors();
   * ```
   */
  protected async loadPlayerExtractors(): Promise<void> {
    this.#player.extractors.loadMulti(DefaultExtractors);
  }

  /**
   * Get the list of handlers
   * @returns Promise<string[]>
   * @example
   * ```
   * const bot = await Bot.createInstace();
   * const handlers = await bot.getHandlerList();
   * console.log(handlers);
   * ```
   */
  protected static async getHandlerList(): Promise<string[]> {
    const isDirExists = this.#isHandlerDirectoryExists(HANDLER_PATH);
    if (!isDirExists) {
      print(EPrintType.ERROR, `Handler directory not found at ${HANDLER_PATH}`);
      return [];
    }

    const { list } = HandlerConfig;
    const handlerList: string[] = [];

    for (const handler of list) {
      const isFileExists = await this.#isHandlerExists(handler);
      if (isFileExists) handlerList.push(handler);
    }

    return handlerList;
  }

  /**
   * Check if the handler directory exists
   * @param path string
   * @returns boolean
   * @example
   * ```
   * const bot = await Bot.createInstace();
   * bot.#isHandlerDirectoryExists(HANDLER_PATH);
   * ```
   */
  static #isHandlerDirectoryExists(path: string): boolean {
    if (!path || path === "") return false;

    try {
      return fs.existsSync(path);
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  /**
   * Check if the handler exists
   * @param fileName string
   * @returns Promise<boolean>
   * @example
   * ```
   * const bot = await Bot.createInstace();
   * await bot.#isHandlerExists("ping.handler");
   * ```
   */
  static async #isHandlerExists(fileName: string): Promise<boolean> {
    if (!fileName || fileName === "") return false;

    try {
      const parsedFileName = path.parse(fileName).name;
      if (!parsedFileName) return false;
      const filePath = path.join(
        HANDLER_PATH,
        `${parsedFileName}.handler.${fileExtension}`
      );
      const relativePath = (isProduction ? "../" : "") + filePath;

      return await import(relativePath).then(() => true).catch(() => false);
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  /**
   * Log the status of the bot
   * @param name string
   * @param category string
   * @param type ELogStatus
   * @returns void
   * @example
   * ```
   * const bot = await Bot.createInstace();
   * bot.logStatus("ping", "Command", ELogStatus.SUCCESS);
   * ```
   */
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

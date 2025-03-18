import BotClientConfig from "@config/bot-client.js";
import PlayerOptionsConfig from "@config/player-options.js";
import {
  CommandInteraction,
  Message,
  EmbedFooterOptions,
  InteractionResponse,
} from "discord.js";
import { IEmbedBuilder, IEmbedData } from "@interfaces/embeding.js";
import { ICommandFile } from "@interfaces/commandFile.js";
import Base from "./base.js";
import Embed from "./embed.js";
import Cooldown from "./cooldown.js";

class Bot extends Base {
  /**
   * Create a new instance of Bot
   * @param handlerList string[]
   * @returns Bot
   */
  private constructor(handlerList: string[]) {
    super(handlerList, BotClientConfig, PlayerOptionsConfig);
  }

  /**
   * Create a new instance of Bot
   * @returns Promise<Bot>
   * @example
   * ```
   * const bot = await Bot.createInstace();
   * ```
   */
  public static async createInstace(): Promise<Bot> {
    const handlerList = await Base.getHandlerList();
    return new Bot(handlerList);
  }

  /**
   * Build the bot
   * @returns Promise<void>
   * @example
   * ```
   * const bot = await Bot.createInstace();
   * await bot.build();
   * ```
   */
  public async build(): Promise<void> {
    await this.buildHandlers();
  }

  /**
   * Start the bot
   * @returns Promise<void>
   * @example
   * ```
   * const bot = await Bot.createInstace();
   * await bot.start();
   * ```
   */
  public async start(): Promise<void> {
    await this.clientLogin();
  }

  /**
   * Send a message for standalone message or reply for interaction
   * @param interaction CommandInteraction | Message<boolean>
   * @param data IEmbedData
   * @returns Message | InteractionResponse<boolean>
   * @example
   * ```
   * const bot = await Bot.createInstace();
   * await bot.send(interaction, {
   *  embeds: [new EmbedBuilder().setTitle("Hello, world!")],
   *  ephemeral: false,
   *  fetchReply: false,
   * });
   * ```
   */
  public async send(
    interaction: CommandInteraction | Message<boolean>,
    data: IEmbedData
  ): Promise<Message | InteractionResponse<boolean>> {
    return Embed.send(interaction, data);
  }

  /**
   * Send embed message
   * @param interaction CommandInteraction | Message<boolean>
   * @param data IEmbedBuilder
   * @param ephemeral boolean
   * @param fetchReply boolean
   * @returns Message | InteractionResponse<boolean>
   * @example
   * ```
   * const bot = await Bot.createInstace();
   * await bot.sendEmbed(interaction, {
   *  title: "Title",
   *  description: "Description",
   *  color: "Red",
   *  footer: bot.getFooter(interaction),
   * }, false, false);
   * ```
   */
  public async sendEmbed(
    interaction: CommandInteraction | Message<boolean>,
    data: IEmbedBuilder,
    ephemeral: boolean = false,
    fetchReply: boolean = false
  ): Promise<Message | InteractionResponse<boolean>> {
    return Embed.sendEmbed(interaction, data, ephemeral, fetchReply);
  }

  /**
   * Get footer options
   * @param client CommandInteraction | Message<boolean>
   * @returns EmbedFooterOptions
   * @example
   * ```
   * const bot = await Bot.createInstace();
   * bot.getFooter(interaction);
   * ```
   */
  public getFooter(
    client: CommandInteraction | Message<boolean>
  ): EmbedFooterOptions {
    return Embed.getFooter(client, this.config);
  }

  /**
   * Get cooldown
   * @param interaction CommandInteraction | Message<boolean>
   * @param command ICommandFile
   * @returns boolean | number
   * @example
   * ```
   * const bot = await Bot.createInstace();
   * bot.cooldown(interaction, command);
   * ```
   */
  public cooldown(
    interaction: CommandInteraction | Message<boolean>,
    command: ICommandFile
  ): boolean | number {
    return Cooldown.handleCooldown(interaction, command, this.cooldowns);
  }
}

export default Bot;

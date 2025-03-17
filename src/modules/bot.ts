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
  private constructor(handlerList: string[]) {
    super(handlerList, BotClientConfig, PlayerOptionsConfig);
  }

  public static async createInstace(): Promise<Bot> {
    const handlerList = await Base.getHandlerList();
    return new Bot(handlerList);
  }

  public async build(): Promise<void> {
    await this.buildHandlers();
  }

  public async start(): Promise<void> {
    await this.clientLogin();
  }

  public async send(
    interaction: CommandInteraction | Message<boolean>,
    data: IEmbedData
  ): Promise<Message | InteractionResponse<boolean>> {
    return Embed.send(interaction, data);
  }

  public async sendEmbed(
    interaction: CommandInteraction | Message<boolean>,
    data: IEmbedBuilder,
    ephemeral: boolean = false,
    fetchReply: boolean = false
  ): Promise<Message | InteractionResponse<boolean>> {
    return Embed.sendEmbed(interaction, data, ephemeral, fetchReply);
  }

  public getFooter(
    client: CommandInteraction | Message<boolean>,
    type?: string
  ): EmbedFooterOptions {
    return Embed.getFooter(client, this.config, type);
  }

  public cooldown(
    interaction: CommandInteraction | Message<boolean>,
    command: ICommandFile
  ): boolean | number {
    return Cooldown.handleCooldown(interaction, command, this.cooldowns);
  }
}

export default Bot;

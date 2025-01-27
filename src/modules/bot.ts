import fs from "node:fs";
import ClientConfig from "@config/discord-client.js";
import { Player } from "discord-music-player";
import BotClientConfig from "@config/bot-client.js";
import PlayerOptionsConfig from "@config/player-options.js";
import HandlerConfig from "@config/bot-handler.js";
import EmojiConfig from "@config/emojis.js";
import ELogStatus from "@enums/ELogStatus.js";
import print from "@utils/print.js";
import EPrintType from "@/enums/EPrintType.js";
import CatchError from "@/classes/CatchError.js";
import Handler from "@templates/handler.js";
import { IEmbedBuilder, IEmbedData } from "@interfaces/embeding.js";
import { ICommandFile } from "@interfaces/cooldown.js";
import {
  Client,
  Collection,
  CommandInteraction,
  EmbedBuilder,
  EmbedFooterOptions,
  InteractionResponse,
  Message,
  TextChannel,
} from "discord.js";

const HANDLER_PATH = "./../handlers";

class Bot extends Client {
  public player: Player;

  public events: Collection<string, any>;

  public cooldowns: Collection<string, any>;

  public slashCommands: Collection<string, any>;

  public messageCommands: Collection<string, any>;

  public readonly config: typeof BotClientConfig;

  public readonly prefix: string;

  private listOfHandlers: string[] = [];

  private constructor(
    handlerList: string[],
    config: typeof BotClientConfig,
    playerConfig: typeof PlayerOptionsConfig
  ) {
    super(ClientConfig)

    this.player = new Player(this as any, playerConfig);

    this.events = new Collection();
    this.cooldowns = new Collection();
    this.slashCommands = new Collection();
    this.messageCommands = new Collection();

    this.config = config;
    this.prefix = config.bot.prefix;

    this.listOfHandlers = handlerList;
  }

  public static async createInstace(): Promise<Bot> {
    this.isHandlerDirectoryExists(HANDLER_PATH);

    const { list } = HandlerConfig;
    const handlerList: string[] = [];

    for (const handler of list) {
      const isFileExists = await this.isHandlerExists(handler);

      if (isFileExists) {
        handlerList.push(handler);
      }
    }

    return new Bot(handlerList, BotClientConfig, PlayerOptionsConfig);
  }

  public async build(): Promise<void> {
    try {
      this.listOfHandlers.forEach(async (file) => {
        const handler: Handler = await import(`${HANDLER_PATH}/${file}.handler`).then((handler) => handler.default);
        this.logStatus(handler.name, "Handler", ELogStatus.LOADING);
        await handler.run(this)
          .then(() => this.logStatus(handler.name, "Handler", ELogStatus.SUCCESS))
          .catch(() => this.logStatus(handler.name, "Handler", ELogStatus.ERROR));
      });
    } catch (error) {
      CatchError.print(error);
    }
  }

  public async start(): Promise<void> {
    await this.login(this.config.bot.token)
      .then(() => {
        this.logStatus(`Logged in as ${this.user?.displayName}`, "Client", ELogStatus.SUCCESS);
      })
      .catch((error) => {
        this.logStatus(`Something went wrong: ${error}`, "Client", ELogStatus.ERROR);
      });
  }

  private static async isHandlerExists(fileName: string): Promise<boolean> {
    if (!fileName || fileName === "") return false;

    try {
      let parsedFileName = fileName.split("/").pop();
      if (!parsedFileName) return false;

      // Remove the file extension
      parsedFileName = parsedFileName.replace(/\.[^/.]+$/, "");

      return await import(`${HANDLER_PATH}/${parsedFileName}.handler`)
        .then(() => true)
        .catch(() => false);
    } catch (error) {
      console.log(error);

      return false;
    }
  }

  private static isHandlerDirectoryExists(path: string): boolean {
    if (!path || path === "") return false;

    const isExists = fs.existsSync(path);

    try {
      if (!isExists) {
        fs.mkdirSync(path);
      }

      return true;
    } catch (error) {
      console.log(error);

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

  public async send(
    interaction: CommandInteraction|Message<boolean>,
    data: IEmbedData,
  ): Promise<Message|InteractionResponse<boolean>> {
    try {
      if (interaction instanceof Message) {
        if (interaction.channel instanceof TextChannel) return await interaction.channel.send({ embeds: data.embeds });
        else return await interaction.reply({ embeds: data.embeds });
      }

      if (interaction.deferred) return await interaction.editReply({ embeds: data.embeds });
      else if (interaction.replied) return await interaction.deferReply({ ephemeral: data.ephemeral });
      else return await interaction.reply({
        embeds: data.embeds,
        ephemeral: data.ephemeral,
        fetchReply: data.fetchReply
      });
    } catch (error: unknown) {
      CatchError.print(error);

      return await interaction.reply({
        content: "Something went wrong",
        ephemeral: data.ephemeral,
        fetchReply: data.fetchReply
      });
    }
  }

  public async sendEmbed(
    interaction: CommandInteraction|Message<boolean>,
    data: IEmbedBuilder,
    ephemeral: boolean = false,
    fetchReply: boolean = false
  ): Promise<Message|InteractionResponse<boolean>> {
    try {
      const embed = new EmbedBuilder();

      if (data.url) embed.setURL(data.url);
      if (data.title) embed.setTitle(data.title);
      if (data.color) embed.setColor(data.color);
      if (data.image) embed.setImage(data.image);
      if (data.footer) embed.setFooter(data.footer);
      if (data.fields) embed.setFields(data.fields);
      if (data.author) embed.setAuthor(data.author);
      if (data.thumbnail) embed.setThumbnail(data.thumbnail);
      if (data.description) embed.setDescription(data.description);

      embed.setTimestamp();

      return await this.send(interaction, {
        embeds: [embed],
        ephemeral: ephemeral,
        fetchReply: fetchReply
      });
    } catch (error: unknown) {
      CatchError.print(error);

      return await this.send(interaction, {
        content: "Something went wrong",
        ephemeral: ephemeral,
        fetchReply: fetchReply
      });
    }
  }

  public getFooter(
    client: CommandInteraction|Message<boolean>,
    type?: string,
  ): EmbedFooterOptions {
    try {
      if (!client || type) return {
        text: `${this.config.bot.name} | Bot by ${this.config.bot.author}`,
        iconURL: this.config.bot.icon,
      };

      if (client instanceof Message) return {
        text: `Requested by ${client.author.username} | Bot by ${this.config.bot.author}`,
        iconURL: client.author.displayAvatarURL({ forceStatic: false, size: 512 })
      };

      return {
        text: `Requested by ${client.user.username} | Bot by ${this.config.bot.author}`,
        iconURL: client.user.displayAvatarURL({ forceStatic: false, size: 512 })
      };
    } catch (error: unknown) {
      CatchError.print(error);

      return {
        text: `${this.config.bot.name} | Bot by ${this.config.bot.author}`,
        iconURL: this.config.bot.icon,
      };
    }
  }

  public cooldown(
    interaction: CommandInteraction|Message<boolean>,
    command: ICommandFile
  ): boolean|number {
    if (!interaction || !command) return false;
    if (!command.cooldown || command.cooldown < 1) command.cooldown = 5;

    let { client, member } = interaction;
    if (!client.cooldowns.has(command.name)) client.cooldowns.set(command.name, new Collection());

    const commandCooldown: Collection<string, any> = client.cooldowns.get(command.name);
    if (commandCooldown === undefined) return false;

    const now = Date.now();
    const currMember = member?.user.id || "0";
    const cooldownAmount = command.cooldown * 1000;
    if (commandCooldown.has(currMember)) {
      const expiredTime = commandCooldown.get(currMember) + cooldownAmount;

      if (now < expiredTime) {
        const timeLeft = (expiredTime - now) / 1000;
        return timeLeft;
      }

      commandCooldown.set(currMember, now);
      setTimeout(() => commandCooldown.delete(currMember), cooldownAmount);
      return false;
    }

    commandCooldown.set(currMember, now);
    setTimeout(() => commandCooldown.delete(currMember), cooldownAmount);
    return false;
  }
}

export default Bot;

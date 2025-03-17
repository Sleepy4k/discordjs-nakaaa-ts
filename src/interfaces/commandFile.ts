import {
  ApplicationCommandType,
  ChatInputCommandInteraction,
  CommandInteraction,
  Message,
} from "discord.js";
import TBotClient from "./botClient.js";

/**
 * Command function
 *
 * @param {TBotClient} client
 * @param {Message | ChatInputCommandInteraction} interaction
 * @param {string[]} args
 * @param {string} prefix
 *
 * @returns {Promise<void>}
 */
type TCommandFunc = (
  client: TBotClient,
  interaction: Message | ChatInputCommandInteraction,
  args: string[],
  prefix: string
) => Promise<void>;

interface ICommandParams {
  /**
   * @type {TBotClient}
   */
  client: TBotClient;

  /**
   * @type {CommandInteraction | Message}
   */
  interaction: CommandInteraction | Message;

  /**
   * @type {string}
   */
  args?: string[];

  /**
   * @type {string}
   */
  prefix?: string;
}

interface ICommandFile {
  /**
   * @type {string}
   */
  name: string;

  /**
   * If enable slash command
   * @type {boolean}
   */
  enableSlash?: boolean

  /**
   * @type {string | string[]}
   */
  aliases?: string | string[];

  /**
   * @type {string}
   */
  description: string;

  /**
   * @type {bigint}
   */
  userPermissions?: bigint;

  /**
   * @type {bigint}
   */
  botPermissions?: bigint;

  /**
   * @type {string}
   */
  category: string;

  /**
   * @type {number}
   */
  cooldown?: number;

  /**
   * @type {ApplicationCommandType}
   */
  type?: ApplicationCommandType;

  /**
   * @type {Array<object>}
   */
  options?: Array<object>;

  /**
   * @type {TCommandFunc}
   */
  run: TCommandFunc;
}

export type { TCommandFunc, ICommandParams, ICommandFile };

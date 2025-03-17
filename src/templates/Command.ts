import { ICommandFile, TCommandFunc } from "@interfaces/commandFile.js";
import { ApplicationCommandType, PermissionFlagsBits } from "discord.js";

class Command {
  /**
   * Event name
   * @type {string}
   */
  name: string

  /**
   * If enable slash command
   * @type {boolean}
   */
  enableSlash?: boolean

  /**
   * Event name alias
   * @type {string | string[]}
   */
  aliases?: string | string[]

  /**
   * Event description
   * @type {string}
   */
  description: string

  /**
   * Event user permissions
   * @type {bigint}
   */
  userPermissions?: bigint

  /**
   * Event bot permissions
   * @type {bigint}
   */
  botPermissions?: bigint

  /**
   * Event category
   * @type {string}
   */
  category: string

  /**
   * Event cooldown
   * @type {number}
   */
  cooldown: number

  /**
   * Event type
   * @type {ApplicationCommandType}
   */
  type?: ApplicationCommandType

  /**
   * Event options
   * @type {Array<object>}
   */
  options?: Array<object>

  /**
   * Event function
   * @type {TCommandFunc}
   */
  run: TCommandFunc

  /**
   * Init Event
   *
   * @param {ICommandFile} params
   */
  constructor(params: ICommandFile) {
    this.name = params.name;
    this.enableSlash = params.enableSlash || false;
    this.aliases = params.aliases;
    this.description = params.description;
    this.userPermissions = params.userPermissions || PermissionFlagsBits.SendMessages;
    this.botPermissions = params.botPermissions || PermissionFlagsBits.SendMessages;
    this.category = params.category;
    this.cooldown = params.cooldown || 0;
    this.type = params.type || ApplicationCommandType.ChatInput;
    this.options = params.options || [];
    this.run = params.run;
  }
}

export default Command;

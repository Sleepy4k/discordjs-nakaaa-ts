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
import { ICommandFile } from "@interfaces";
import type { TMessageFunc } from "@types";
import { ApplicationCommandType } from "discord.js";

class Command {
  /**
   * Event name
   * @type {string}
   */
  name: string

  /**
   * Event description
   * @type {string}
   */
  description: string

  /**
   * Event user permissions
   * @type {bigint}
   */
  userPermissions: bigint

  /**
   * Event bot permissions
   * @type {bigint}
   */
  botPermissions: bigint

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
   * @type {TMessageFunc}
   */
  run: TMessageFunc

  /**
   * Init Event
   *
   * @param {ICommandFile} params
   */
  constructor(params: ICommandFile) {
    this.name = params.name;
    this.description = params.description;
    this.userPermissions = params.userPermissions;
    this.botPermissions = params.botPermissions;
    this.category = params.category;
    this.cooldown = params.cooldown || 0;
    this.type = params.type;
    this.options = params.options;
    this.run = params.run;
  }
}

export default Command;

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
import { PermissionFlags, ApplicationCommandType } from "discord.js";

interface ICommandFile {
  /**
   * @type {string}
   */
  name: string;

  /**
   * @type {string}
   */
  description: string;

  /**
   * @type {PermissionFlags}
   */
  userPermissions: PermissionFlags;

  /**
   * @type {PermissionFlags}
   */
  botPermissions: PermissionFlags;

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
   * @type {Function}
   */
  run: Function;
}

export default ICommandFile;
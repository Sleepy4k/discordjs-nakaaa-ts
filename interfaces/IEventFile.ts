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
import type { TEventFunc } from "@types";

interface IEventFile {
  /**
   * @type {string}
   */
  name: string;

  /**
   * @type {TEventFunc}
   */
  run: TEventFunc;
}

export default IEventFile;

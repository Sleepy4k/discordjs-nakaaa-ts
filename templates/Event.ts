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
import { IEventFile } from "@interfaces";
import type { TEventFunc } from "@types";

class Event {
  /**
   * Event name
   * @type {string}
   */
  name: string

  /**
   * Event function
   * @type {TEventFunc}
   */
  run: TEventFunc

  /**
   * Init Event
   *
   * @param {IEventFile}
   */
  constructor(params: IEventFile) {
    this.name = params.name;
    this.run = params.run;
  }
}

export default Event;

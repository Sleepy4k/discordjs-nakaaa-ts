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
import { IHandlerFile } from "@interfaces";
import type { THandlerFunc } from "@types";

class Handler {
  /**
   * Handler name
   * @type {string}
   */
  name: string

  /**
   * Handler function
   * @type {THandlerFunc}
   */
  run: THandlerFunc

  /**
   * Init Handler
   *
   * @param {IHandlerFile} params
   */
  constructor(params: IHandlerFile) {
    this.name = params.name;
    this.run = params.run;
  }
}

export default Handler;

import TBotClient from "./botClient.js";

/**
 * Event function
 *
 * @param {TBotClient} client
 * @param {any[]} args
 *
 * @returns {void}
 */
type TEventFunc = (client: TBotClient, ...args: any[]) => Promise<void>;

interface IEventFile {
  /**
   * Event name
   *
   * @type {string}
   */
  name: string;

  /**
   * Event function
   *
   * @type {TEventFunc}
   */
  run: TEventFunc;
}

export type {
  TEventFunc,
  IEventFile
};
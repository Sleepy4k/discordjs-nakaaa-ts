import TBotClient from "./botClient.js";

/**
 * Handler function
 *
 * @param {TBotClient} client
 *
 * @returns {Promise<void>}
 */
type THandlerFunc = (client: TBotClient) => Promise<void>;

interface IHandlerParams {
  /**
   * Handler name
   *
   * @type {string}
   */
  name: string;

  /**
   * Handler function
   *
   * @type {THandlerFunc}
   */
  run: THandlerFunc;
}

export type { THandlerFunc, IHandlerParams };

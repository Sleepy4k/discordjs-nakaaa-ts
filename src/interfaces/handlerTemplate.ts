import Bot from "@modules/bot.js";

type THandlerFunc = (client: Bot) => Promise<void>;

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

export type {
  THandlerFunc,
  IHandlerParams
};

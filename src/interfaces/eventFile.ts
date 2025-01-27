import Bot from "@modules/bot.js";

type TEventFunc = (client: Bot, ...args: any[]) => Promise<void>;

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
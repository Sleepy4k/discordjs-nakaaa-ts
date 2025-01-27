import { Events } from "discord.js";
import type {
  TEventFunc,
  IEventFile
} from "@interfaces/eventFile.js";

class Event {
  /**
   * Event name
   *
   * @type {string|Events}
   */
  name: string|Events

  /**
   * Event function
   *
   * @type {TEventFunc}
   */
  run: TEventFunc

  /**
   * Init Event
   *
   * @param {IEventFile} params
   */
  constructor(params: IEventFile) {
    this.name = params.name;
    this.run = params.run;
  }
}

export default Event;

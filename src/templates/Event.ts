import { Events } from "discord.js";
import type { TEventFunc, IEventFile, TPlayerFunc } from "@interfaces/eventFile.js";
import EEventType from "@enums/EEventType.js";

class Event {
  /**
   * Event name
   *
   * @type {string|Events}
   */
  name: string | Events;

  /**
   * Event type
   *
   * @type {EEventType|typeof EEventType}
   */
  type?: EEventType | typeof EEventType;

  /**
   * Event function
   *
   * @type {TEventFunc|TPlayerFunc}
   */
  run: TEventFunc | TPlayerFunc;

  /**
   * Init Event
   *
   * @param {IEventFile} params
   */
  public constructor(params: IEventFile) {
    this.name = params.name;
    this.type = params.type || EEventType.CLIENT;
    this.run = params.run;
  }
}

export default Event;

import EEventType from "@enums/EEventType.js";
import TBotClient from "./botClient.js";
import { GuildQueue, Track } from "discord-player";
import {
  ChatInputCommandInteraction,
  Message,
  TextBasedChannel,
} from "discord.js";

/**
 * Event function
 *
 * @param {TBotClient} client
 * @param {any[]} args
 *
 * @returns {void}
 */
type TEventFunc = (client: TBotClient, ...args: any[]) => Promise<void>;

/**
 * Player queue
 *
 * @type {Object}
 * @property {Message | ChatInputCommandInteraction} interaction
 * @property {TextBasedChannel} channel
 * @extends {GuildQueue}
 */
type TPlayerQueue = GuildQueue<{
  interaction: Message | ChatInputCommandInteraction;
  channel: TextBasedChannel;
}>;

/**
 * Player function
 *
 * @type {Function}
 * @param {TBotClient} client
 * @param {TPlayerQueue} queue
 * @param {TPlayerTrack} track
 * @returns {Promise<void>}
 */
type TPlayerFunc = (
  client: TBotClient,
  queue: TPlayerQueue,
  track: Track
) => Promise<void>;

interface IEventFile {
  /**
   * Event name
   *
   * @type {string}
   */
  name: string;

  /**
   * Event type
   *
   * @type {EEventType | typeof EEventType}
   */
  type?: EEventType | typeof EEventType;

  /**
   * Event function
   *
   * @type {TEventFunc | TPlayerFunc}
   */
  run: TPlayerFunc | TEventFunc;
}

export type { TEventFunc, TPlayerFunc, IEventFile, TPlayerQueue };

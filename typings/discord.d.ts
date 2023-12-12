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
import config from '@config';
import { IChatBot } from '@interfaces';
import type { Collection } from 'discord.js';

declare module "discord.js" {
  interface Client {
    /**
     * @type {config}
     */
    config: config;

    /**
     * @type {Collection<string, any>}
     */
    events: Collection<string, any>;

    /**
     * @type {Collection<string, any>}
     */
    scommands: Collection<string, any>;

    /**
     * @type {Collection<string, any>}
     */
    mcommands: Collection<string, any>;

    /**
     * @type {Collection<string, any>}
     */
    cooldowns: Collection<string, any>;

    /**
     * @type {string}
     */
    prefix: string;

    /**
     * @type {IChatBot}
     */
    chatbot: IChatBot;

    /**
     * @type {Player}
     */
    player: Player;
  }
}

import type { Collection } from 'discord.js';
import { Player } from "discord-music-player";
import BotClientConfig from "@config/bot-client.js";

declare module "discord.js" {
  interface Client {
    /**
     * @type {BotClientConfig}
     */
    config: typeof BotClientConfig;

    /**
     * @type {Collection<string, any>}
     */
    events: Collection<string, any>;

    /**
     * @type {Collection<string, any>}
     */
    slashCommands: Collection<string, any>;

    /**
     * @type {Collection<string, any>}
     */
    messageCommands: Collection<string, any>;

    /**
     * @type {Collection<string, any>}
     */
    cooldowns: Collection<string, any>;

    /**
     * @type {string}
     */
    prefix: string;

    /**
     * @type {Player}
     */
    player: Player;
  }
}
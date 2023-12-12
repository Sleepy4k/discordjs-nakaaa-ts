/**
import { CharacterAI } from 'node_characterai';
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
declare module "node_characterai" {
  export default class CharacterAI {
    constructor();

    /**
     * @param {string}
     *
     * @returns {Promise<string>}
     */
    getResponse(message: string): Promise<string>;

    /**
     * @param {string}
     *
     * @returns {Promise<string>}
     */
    getResponseAsync(message: string): Promise<string>;

    /**
     * @param {string}
     *
     * @returns {Promise<void>}
     */
    authenticateWithToken(token: string): Promise<void>;

    /**
     * @returns {Promise<void>}
     */
    authenticateAsGuest(): Promise<void>;

    /**
     * @param {string}
     *
     * @returns {Promise<CharacterAI>}
     */
    createOrContinueChat(characterID: string): Promise<CharacterAI>;
  }
}

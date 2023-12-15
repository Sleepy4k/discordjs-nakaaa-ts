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
import CharacterAI from "node_characterai";

interface IChatBot {
  /**
   * @type {any}
   */
  AIChat: any;

  /**
   * @type {boolean}
   */
  isAIAuthenticated: boolean;

  /**
   * @type {boolean}
   */
  isPuppeteerInitialized: boolean;

  /**
   * @type {CharacterAI}
   */
  characterAI: CharacterAI;
}

export default IChatBot;

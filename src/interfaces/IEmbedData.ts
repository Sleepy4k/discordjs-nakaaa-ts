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
import {
  APIEmbed,
  JSONEncodable
} from "discord.js";

interface IEmbedData {
  /**
   * @type {(APIEmbed | JSONEncodable)[] | undefined}
   */
  embeds?: (JSONEncodable<APIEmbed> | APIEmbed)[] | undefined;

  /**
   * @type {string | null}
   */
  content?: string | null;

  /**
   * @type {boolean}
   */
  ephemeral: boolean;

  /**
   * @type {boolean}
   */
  fetchReply: boolean;
}

export default IEmbedData;

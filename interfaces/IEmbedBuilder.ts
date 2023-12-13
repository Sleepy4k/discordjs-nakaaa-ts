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
  ColorResolvable,
  EmbedFooterOptions,
  EmbedAuthorOptions
} from "discord.js";

interface IEmbedBuilder {
  /**
   * @type {string | null}
   */
  title?: string | null;

  /**
   * @type {string | null}
   */
  description?: string | null;

  /**
   * @type {ColorResolvable | null}
   */
  color?: ColorResolvable | null;

  /**
   * @type {string | null}
   */
  image?: string | null;

  /**
   * @type {string | null}
   */
  thumbnail?: string | null;

  /**
   * @type {EmbedFooterOptions | null}
   */
  footer?: EmbedFooterOptions | null;

  /**
   * @type {string | null}
   */
  url?: string | null;

  /**
   * @type {EmbedAuthorOptions | null}
   */
  author?: EmbedAuthorOptions | null;
}

export default IEmbedBuilder;

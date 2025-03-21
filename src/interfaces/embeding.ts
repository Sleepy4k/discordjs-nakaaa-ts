import {
  APIEmbed,
  EmbedField,
  JSONEncodable,
  ColorResolvable,
  EmbedFooterOptions,
  EmbedAuthorOptions,
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

  /**
   * @type {EmbedField[] | null}
   */
  fields?: EmbedField[] | null;
}

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

export type {
  IEmbedBuilder,
  IEmbedData,
};

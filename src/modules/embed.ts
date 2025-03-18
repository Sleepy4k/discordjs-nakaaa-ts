import {
  CommandInteraction,
  EmbedBuilder,
  EmbedFooterOptions,
  InteractionResponse,
  Message,
  TextChannel,
} from "discord.js";
import { IEmbedBuilder, IEmbedData } from "@interfaces/embeding.js";
import CatchError from "@classes/CatchError.js";
import BotClientConfig from "@config/bot-client.js";

class Embed {
  /**
   * Send a message for standalone message or reply for interaction
   * @param interaction CommandInteraction | Message<boolean>
   * @param data IEmbedData
   * @returns Message | InteractionResponse<boolean>
   * @example
   * ```
   * const embed = new Embed);
   * await embed.send(interaction, {
   *  embeds: [new EmbedBuilder().setTitle("Hello, world!")],
   *  ephemeral: false,
   *  fetchReply: false,
   * });
   * ```
   */
  public static async send(
    interaction: CommandInteraction | Message<boolean>,
    data: IEmbedData
  ): Promise<Message | InteractionResponse<boolean>> {
    try {
      if (interaction instanceof Message) {
        if (interaction.channel instanceof TextChannel)
          return await interaction.channel.send({ embeds: data.embeds });
        else return await interaction.reply({ embeds: data.embeds });
      }

      if (interaction.deferred)
        return await interaction.editReply({ embeds: data.embeds });
      else if (interaction.replied)
        return await interaction.reply({
          embeds: data.embeds,
          ephemeral: data.ephemeral,
          fetchReply: data.fetchReply,
        });
      else
        return await interaction.reply({
          embeds: data.embeds,
          ephemeral: data.ephemeral,
          fetchReply: data.fetchReply,
        });
    } catch (error: unknown) {
      CatchError.print(error);
      return await interaction.reply({
        content: "Something went wrong",
        ephemeral: data.ephemeral,
        fetchReply: data.fetchReply,
      });
    }
  }

  /**
   * Send an embed message
   * @param interaction CommandInteraction | Message<boolean>
   * @param data IEmbedBuilder
   * @param ephemeral boolean
   * @param fetchReply boolean
   * @returns Message | InteractionResponse<boolean>
   * @example
   * ```
   * const embed = new Embed();
   * await embed.sendEmbed(interaction, {
   *  title: "Hello, world!",
   *  description: "This is a test message",
   *  color: "RANDOM",
   *  footer: {
   *    text: "Bot by author",
   *    iconURL: "https://example.com/icon.png",
   *  },
   *  thumbnail: "https://example.com/thumbnail.png",
   *  author: {
   *    name: "Author",
   *    iconURL: "https://example.com/author.png",
   *  },
   *  fields: [
   *    {
   *      name: "Field 1",
   *      value: "Value 1",
   *      inline: true,
   *    },
   *    {
   *      name: "Field 2",
   *      value: "Value 2",
   *      inline: true,
   *    },
   *  ],
   * }, false, false);
   * ```
   */
  public static async sendEmbed(
    interaction: CommandInteraction | Message<boolean>,
    data: IEmbedBuilder,
    ephemeral: boolean = false,
    fetchReply: boolean = false
  ): Promise<Message | InteractionResponse<boolean>> {
    try {
      const embed = new EmbedBuilder();

      if (data.url) embed.setURL(data.url);
      if (data.title) embed.setTitle(data.title);
      if (data.color) embed.setColor(data.color);
      if (data.image) embed.setImage(data.image);
      if (data.footer) embed.setFooter(data.footer);
      if (data.fields) embed.setFields(data.fields);
      if (data.author) embed.setAuthor(data.author);
      if (data.thumbnail) embed.setThumbnail(data.thumbnail);
      if (data.description) embed.setDescription(data.description);

      embed.setTimestamp();

      return await Embed.send(interaction, {
        embeds: [embed],
        ephemeral: ephemeral,
        fetchReply: fetchReply,
      });
    } catch (error: unknown) {
      CatchError.print(error);
      return await Embed.send(interaction, {
        content: "Something went wrong",
        ephemeral: ephemeral,
        fetchReply: fetchReply,
      });
    }
  }

  /**
   * Get the footer for the embed message
   * @param client CommandInteraction | Message<boolean>
   * @param config typeof BotClientConfig
   * @returns EmbedFooterOptions
   * @example
   * ```
   * const embed = new Embed();
   * embed.getFooter(interaction, BotClientConfig);
   * ```
   */
  public static getFooter(
    client: CommandInteraction | Message<boolean>,
    config: typeof BotClientConfig
  ): EmbedFooterOptions {
    try {
      if (!client)
        return {
          text: `${config.bot.name} | Bot by ${config.bot.author}`,
          iconURL: config.bot.icon,
        };

      if (client instanceof Message)
        return {
          text: `Requested by ${client.author.username} | Bot by ${config.bot.author}`,
          iconURL: client.author.displayAvatarURL({
            forceStatic: false,
            size: 512,
          }),
        };

      return {
        text: `Requested by ${client.user.username} | Bot by ${config.bot.author}`,
        iconURL: client.user.displayAvatarURL({
          forceStatic: false,
          size: 512,
        }),
      };
    } catch (error: unknown) {
      CatchError.print(error);
      return {
        text: `${config.bot.name} | Bot by ${config.bot.author}`,
        iconURL: config.bot.icon,
      };
    }
  }
}

export default Embed;

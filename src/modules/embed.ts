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

  public static getFooter(
    client: CommandInteraction | Message<boolean>,
    config: typeof BotClientConfig,
    type?: string
  ): EmbedFooterOptions {
    try {
      if (!client || type)
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

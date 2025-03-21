import Command from "@templates/Command.js";
import {
  ChatInputCommandInteraction,
  Message,
  PermissionFlagsBits,
} from "discord.js";
import TBotClient from "@interfaces/botClient.js";
import ESlashOpt from "@enums/ESlashOpt.js";
import CatchError from "@classes/CatchError.js";

export default new Command({
  /**
   * Event name
   * @type {string}
   */
  name: "clear",

  /**
   * If enable slash command
   * @type {boolean}
   */
  enableSlash: true,

  /**
   * Event name alias
   * @type {string | string[]}
   */
  aliases: [
    "purge",
    "delete",
    "bulk-delete",
    "bulkdelete",
    "cls",
    "bersihkan",
    "hapus",
    "hapus-pesan",
  ],

  /**
   * Event description
   * @type {string}
   */
  description: "Clear messages in a channel.",

  /**
   * Event category
   * @type {string}
   */
  category: "misc",

  /**
   * Event cooldown
   * @type {number}
   */
  cooldown: 5,

  /**
   * Event options
   * @type {Array<object>}
   */
  options: [
    {
      name: "message",
      description: "The message you want to clear.",
      type: ESlashOpt.INTEGER,
      required: true,
    },
  ],

  /**
   * Event function
   * @type {TCommandFunc}
   */
  run: async (
    client: TBotClient,
    interaction: Message | ChatInputCommandInteraction,
    args: any[],
    prefix: string
  ) => {
    const ephemeral = interaction instanceof ChatInputCommandInteraction;

    if (!args) {
      await client.sendEmbed(
        interaction,
        {
          color: "Red",
          title: "Clear message",
          description: `\`\`\`Usage: ${prefix}clear <Message>\`\`\``,
          footer: client.getFooter(interaction),
        },
        ephemeral
      );
      return;
    }

    const totalMessage = ephemeral
      ? interaction.options.getInteger("message", true)
      : parseInt(args[0]);

    if (!interaction.member || !interaction.channel) {
      await client.sendEmbed(
        interaction,
        {
          color: "Red",
          title: "Clear message",
          description: `\`\`\`You need to be in a server to use this command.\`\`\``,
          footer: client.getFooter(interaction),
        },
        ephemeral
      );
      return;
    }

    if (typeof interaction.member.permissions === "string") {
      await client.sendEmbed(
        interaction,
        {
          color: "Red",
          title: "Clear message",
          description: `\`\`\`You need Manage Messages permission to use this command.\`\`\``,
          footer: client.getFooter(interaction),
        },
        ephemeral
      );
      return;
    }

    if (
      !interaction.member.permissions.has(PermissionFlagsBits.ManageMessages)
    ) {
      await client.sendEmbed(
        interaction,
        {
          color: "Red",
          title: "Clear message",
          description: `\`\`\`You need Manage Messages permission to use this command.\`\`\``,
          footer: client.getFooter(interaction),
        },
        ephemeral
      );
      return;
    }

    if (!totalMessage || isNaN(totalMessage)) {
      await client.sendEmbed(
        interaction,
        {
          color: "Red",
          title: "Clear message",
          description: `\`\`\`Usage: ${
            ephemeral ? "" : prefix
          }clear <Message>\`\`\``,
          footer: client.getFooter(interaction),
        },
        ephemeral
      );
      return;
    }

    if (totalMessage < 1 || totalMessage > 100) {
      await client.sendEmbed(
        interaction,
        {
          color: "Red",
          title: "Clear message",
          description: `\`\`\`Please provide a number between 1 and 99.\`\`\``,
          footer: client.getFooter(interaction),
        },
        ephemeral
      );
      return;
    }

    if (interaction.channel.isDMBased()) {
      await client.sendEmbed(
        interaction,
        {
          color: "Red",
          title: "Clear message",
          description: `\`\`\`You can't use this command in DM.\`\`\``,
          footer: client.getFooter(interaction),
        },
        ephemeral
      );
      return;
    }

    try {
      const deletedMessage = ephemeral ? totalMessage : totalMessage + 1;
      await interaction.channel.bulkDelete(deletedMessage, true);

      await client
        .sendEmbed(
          interaction,
          {
            color: "Green",
            title: "Clear message",
            description: `\`\`\`Successfully deleted ${totalMessage} messages.\`\`\``,
            footer: client.getFooter(interaction),
          },
          ephemeral
        )
        .then((msg) => {
          if (ephemeral) return;

          setTimeout(() => msg.delete(), 2500);
        })
        .catch((error: unknown) => CatchError.print(error));
    } catch (error: unknown) {
      CatchError.print(error);

      await client.sendEmbed(
        interaction,
        {
          color: "Red",
          title: "Clear message",
          description: `\`\`\`An error occurred while running this command.\`\`\``,
          footer: client.getFooter(interaction),
        },
        ephemeral
      );
    }
  },
});

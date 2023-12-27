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
import { ICommandParam } from "@interfaces";
import CatchError from "@classes/CatchError";
import { ChatInputCommandInteraction, PermissionFlagsBits } from "discord.js";

const main = async (data: ICommandParam) => {
  const { client, interaction, args, prefix } = data;

  const ephemeral = interaction instanceof ChatInputCommandInteraction;

  if (!args) return client.sendEmbed(interaction, {
    color: "Red",
    title: "Clear message",
    description: `\`\`\`Usage: ${prefix}clear <Message>\`\`\``,
    footer: client.getFooter(interaction),
  }, ephemeral);

  const totalMessage = ephemeral ? interaction.options.getInteger("message", true) : parseInt(args[0]);

  if (!interaction.member || !interaction.channel) return client.sendEmbed(interaction, {
    color: "Red",
    title: "Clear message",
    description: `\`\`\`You need to be in a server to use this command.\`\`\``,
    footer: client.getFooter(interaction),
  }, ephemeral);

  if (typeof interaction.member.permissions === "string") return client.sendEmbed(interaction, {
    color: "Red",
    title: "Clear message",
    description: `\`\`\`You need Manage Messages permission to use this command.\`\`\``,
    footer: client.getFooter(interaction),
  }, ephemeral);

  if (!interaction.member.permissions.has(PermissionFlagsBits.ManageMessages)) return client.sendEmbed(interaction, {
    color: "Red",
    title: "Clear message",
    description: `\`\`\`You need Manage Messages permission to use this command.\`\`\``,
    footer: client.getFooter(interaction),
  }, ephemeral);

  if (!totalMessage || isNaN(totalMessage)) return client.sendEmbed(interaction, {
    color: "Red",
    title: "Clear message",
    description: `\`\`\`Usage: ${ephemeral ? "" : prefix}clear <Message>\`\`\``,
    footer: client.getFooter(interaction),
  }, ephemeral);

  if (totalMessage < 1 || totalMessage > 100) return client.sendEmbed(interaction, {
    color: "Red",
    title: "Clear message",
    description: `\`\`\`Please provide a number between 1 and 99.\`\`\``,
    footer: client.getFooter(interaction),
  }, ephemeral);

  if (interaction.channel.isDMBased()) return client.sendEmbed(interaction, {
    color: "Red",
    title: "Clear message",
    description: `\`\`\`You can't use this command in DM.\`\`\``,
    footer: client.getFooter(interaction),
  }, ephemeral);

  try {
    const deletedMessage = ephemeral ? totalMessage : totalMessage + 1;
    await interaction.channel.bulkDelete(deletedMessage, true);

    return client.sendEmbed(interaction, {
      color: "Green",
      title: "Clear message",
      description: `\`\`\`Successfully deleted ${totalMessage} messages.\`\`\``,
      footer: client.getFooter(interaction),
    }, ephemeral).then((msg) => {
      if (ephemeral) return;

      setTimeout(() => msg.delete(), 2500);
    }).catch((error: unknown) => CatchError.print(error));
  } catch (error: unknown) {
    CatchError.print(error);

    return client.sendEmbed(interaction, {
      color: "Red",
      title: "Clear message",
      description: `\`\`\`An error occurred while running this command.\`\`\``,
      footer: client.getFooter(interaction),
    }, ephemeral);
  }
}

export default main;

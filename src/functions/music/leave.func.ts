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
import { ChatInputCommandInteraction } from "discord.js";

const main = async (data: ICommandParam) => {
  const { client, interaction } = data;

  const guild = interaction.guild;
  const member = interaction.member;
  const ephemeral = interaction instanceof ChatInputCommandInteraction;

  if (!guild) return await client.sendEmbed(interaction, {
    color: "Red",
    title: "Error",
    description: "```We can't find your guild data!```",
    footer: client.getFooter(interaction),
  }, ephemeral);

  if (!member) return await client.sendEmbed(interaction, {
    color: "Red",
    title: "Error",
    description: "```We can't find your member data!```",
    footer: client.getFooter(interaction),
  }, ephemeral);

  if ('voice' in member) {
    if (!member.voice.channelId) return await client.sendEmbed(interaction, {
      color: "Red",
      title: "Error",
      description: "```You must be in a voice channel to use this command!```",
      footer: client.getFooter(interaction),
    }, ephemeral);

    const guildId = guild.id;
    const queue = client.player.nodes.get(guildId);

    if (!queue || !queue.isPlaying()) return await client.sendEmbed(interaction, {
      color: "Red",
      title: "Error",
      description: "```There is no music currently playing.```",
      footer: client.getFooter(interaction),
    }, ephemeral);

    if (ephemeral) await interaction.deferReply({ ephemeral }).catch((error: unknown) => CatchError.print(error));

    try {
      if (!queue.deleted) queue.delete();
    } catch(error: unknown) {
      CatchError.print(error);
    }

    return await client.sendEmbed(interaction, {
      color: "Green",
      title: "Success",
      description: "```Left the voice channel.```",
      footer: client.getFooter(interaction),
    }, ephemeral);
  } else {
    return await client.sendEmbed(interaction, {
      color: "Red",
      title: "Error",
      description: "```Something went wrong! Voice data not found!```",
      footer: client.getFooter(interaction),
    }, ephemeral);
  }
}

export default main;
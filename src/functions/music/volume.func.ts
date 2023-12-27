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
import { ChatInputCommandInteraction } from "discord.js";

const main = async (data: ICommandParam) => {
  const { client, interaction, args, prefix } = data;

  const minVolume = 0;
  const maxVolume = 100;
  const guild = interaction.guild;
  const member = interaction.member;
  const ephemeral = interaction instanceof ChatInputCommandInteraction;
  const volume = ephemeral ? interaction.options.getInteger("volume", true) : parseInt(args === undefined ? "0" : args[0]);

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

    if (!queue || !queue.isPlaying()) return client.sendEmbed(interaction, {
      color: "Red",
      title: "Error",
      description: "```There is no music currently playing.```",
      footer: client.getFooter(interaction)
    }, ephemeral);

    if (!volume) return client.sendEmbed(interaction, {
      color: "Red",
      title: "Error",
      description: `\`\`\`Current volume: ${queue.node.volume} / ${maxVolume} to change the volume, please enter a number between 1 and 100. example: ${ephemeral ? "" : prefix}volume 50\`\`\``,
      footer: client.getFooter(interaction)
    }, ephemeral);

    if (volume > maxVolume) return client.sendEmbed(interaction, {
      color: "Red",
      title: "Error",
      description: `\`\`\`The maximum volume is ${maxVolume}.\`\`\``,
      footer: client.getFooter(interaction)
    }, ephemeral);

    if (volume < minVolume) return client.sendEmbed(interaction, {
      color: "Red",
      title: "Error",
      description: `\`\`\`The minimum volume is ${minVolume}.\`\`\``,
      footer: client.getFooter(interaction)
    }, ephemeral);

    if (volume === queue.node.volume) return client.sendEmbed(interaction, {
      color: "Red",
      title: "Error",
      description: `\`\`\`The current volume is ${queue.node.volume}.\`\`\``,
      footer: client.getFooter(interaction)
    }, ephemeral);

    const success = queue.node.setVolume(volume);

    if (!success) return client.sendEmbed(interaction, {
      color: "Red",
      title: "Error",
      description: "```There was an error trying to change the volume.```",
      footer: client.getFooter(interaction)
    }, ephemeral);

    return client.sendEmbed(interaction, {
      color: "Blue",
      title: "Success",
      description: `\`\`\`The volume has been set to ${volume}.\`\`\``,
      footer: client.getFooter(interaction)
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

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
  const { client, interaction, args } = data;

  let mode = null;
  const guild = interaction.guild;
  const member = interaction.member;
  const methods = ["single", "all", "off"];
  const ephemeral = interaction instanceof ChatInputCommandInteraction;
  const loopMode = ephemeral ? interaction.options.getString("mode", true) : args?.join(" ")?.toLowerCase();

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

    if (!loopMode || !methods.includes(loopMode)) return await client.sendEmbed(interaction, {
      color: "Red",
      title: "Error",
      description: "```You must provide a valid loop mode! (single, all, off)```",
      footer: client.getFooter(interaction),
    }, ephemeral);

    switch (loopMode) {
      case "single":
        mode = 1;
        break;
      case "all":
        mode = 2;
        break;
      case "off":
        mode = 0;
        break;
      default:
        mode = 0;
        break;
    }

    if (mode == queue.repeatMode) return await client.sendEmbed(interaction, {
      color: "Green",
      title: "Success",
      description: "```Loop mode is already set to this mode.```",
      footer: client.getFooter(interaction),
    }, ephemeral);

    try {
      queue.setRepeatMode(mode);
    } catch (error: unknown) {
      CatchError.print(error);

      return await client.sendEmbed(interaction, {
        color: "Red",
        title: "Error",
        description: "```Something went wrong! We can't set the loop mode.```",
        footer: client.getFooter(interaction),
      }, ephemeral);
    }

    return await client.sendEmbed(interaction, {
      color: "Green",
      title: "Success",
      description: `\`\`\`Loop mode has been set to ${loopMode}.\`\`\``,
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

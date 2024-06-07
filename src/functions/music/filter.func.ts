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
import { QueueFilters } from "discord-player";
import { ChatInputCommandInteraction } from "discord.js";

const main = async (data: ICommandParam) => {
  const { client, interaction, args, prefix } = data;

  const guild = interaction.guild;
  const member = interaction.member;
  const ValidFilter = client.config.filter.music;
  const ephemeral = interaction instanceof ChatInputCommandInteraction;
  const filter = ephemeral ? interaction.options.getString("filter", true) : args?.join(" ")?.toLowerCase();

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

  if (!filter || filter == undefined) return await client.sendEmbed(interaction, {
    color: "Red",
    title: "Error",
    description: "```Please provide a filter name!```",
    footer: client.getFooter(interaction),
  }, ephemeral);

  if (filter.toLowerCase() == "list") {
    let totalFilter = 0;

    const filterList = ValidFilter.forEach(data => {
      if (data == "list") return;

      totalFilter++;

      return totalFilter + ". " + data + "\n";
    });

    return await client.sendEmbed(interaction, {
      color: "Blue",
      title: "Filter List",
      description: `\`\`\`${filterList}\`\`\``,
      footer: client.getFooter(interaction),
    }, ephemeral);
  }

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

    if (!ValidFilter.includes(filter.toLowerCase())) return await client.sendEmbed(interaction, {
      color: "Red",
      title: "Error",
      description: `\`\`\`Please provide a valid filter name! Use ${prefix}filter list to see all available filters.\`\`\``,
      footer: client.getFooter(interaction),
    }, ephemeral);

    if (filter.toLowerCase() == "clear") {
      try {
        queue.filters.ffmpeg.setFilters(false);
      } catch(error: unknown) {
        CatchError.print(error);
      }

      return await client.sendEmbed(interaction, {
        color: "Green",
        title: "Success",
        description: "Successfully cleared all filters!",
        footer: client.getFooter(interaction),
      }, ephemeral);
    }

    // If the filter is already enabled, then do nothing
    if (queue.filters.ffmpeg.isEnabled(filter as keyof QueueFilters)) {
      return await client.sendEmbed(interaction, {
        color: "Red",
        title: "Error",
        description: `The filter \`${filter}\` is already enabled!`,
        footer: client.getFooter(interaction),
      }, ephemeral);
    }

    try {
      // If other filters are enabled, then disable them
      // This is because ffmpeg filters are applied to the whole stream
      // So we can't have multiple filters enabled at the same time
      if (queue.filters.ffmpeg.getFiltersEnabled().length > 0) {
        queue.filters.ffmpeg.setFilters(false);
      }

      queue.filters.ffmpeg.toggle(filter as keyof QueueFilters);
    } catch(error: unknown) {
      CatchError.print(error);
    }

    return await client.sendEmbed(interaction, {
      color: "Green",
      title: "Success",
      description: `Successfully ${queue.filters.ffmpeg.isEnabled(filter as keyof QueueFilters) ? "enabled" : "disabled"} the filter \`${filter}\`!`,
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

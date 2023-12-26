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

  let queue = null;
  const guild = interaction.guild;
  const member = interaction.member;
  const ephemeral = interaction instanceof ChatInputCommandInteraction;
  const song = ephemeral ? interaction.options.getString("search", true) : args?.join(" ")?.toLowerCase();

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

    if (!member.voice.channel) return await client.sendEmbed(interaction, {
      color: "Red",
      title: "Error",
      description: "```You must be in a voice channel to use this command!```",
      footer: client.getFooter(interaction),
    }, ephemeral);

    if (!song) return await client.sendEmbed(interaction, {
      color: "Red",
      title: "Error",
      description: "```Please provide a song name or url to play.```",
      footer: client.getFooter(interaction),
    }, ephemeral);

    try {
      const results = await client.player.search(song);

      if (!results || !results.hasTracks()) return await client.sendEmbed(interaction, {
        color: "Red",
        title: "Error",
        description: "```No results found!```",
        footer: client.getFooter(interaction),
      }, ephemeral);

      if (ephemeral) await interaction.deferReply({ ephemeral }).catch((error: unknown) => CatchError.print(error));

      await client.sendEmbed(interaction, {
        color: "Blue",
        title: "Searching...",
        description: `\`\`\`Searching for ${results.playlist ? results.tracks.length : results.tracks[0].title}...\`\`\``,
        footer: client.getFooter(interaction),
      }, ephemeral).then((msg) => {
        if (!ephemeral) setTimeout(() => msg.delete(), 2500);
      });

      if (client.player.queues.has(guild)) queue = client.player.nodes.get(guild);
      else {
        await client.sendEmbed(interaction, {
          color: "Green",
          title: "Success",
          description: `\`\`\`Creating queue for ${member.voice.channel.name}...\`\`\``,
          footer: client.getFooter(interaction),
        }, ephemeral).then((msg) => {
          if (!ephemeral) setTimeout(() => msg.delete(), 2500);
        });

        queue = client.player.nodes.create(guild, {
          volume: 75,
          selfDeaf: true,
          leaveOnEnd: false,
          leaveOnEmpty: true,
          leaveOnEndCooldown: 60000,
          leaveOnEmptyCooldown: 60000,
          metadata: {
            channel: interaction.channel,
            requestedBy: interaction.member,
            client: guild.members.me
          }
        });
      }

      if (!queue?.connection) {
        await client.sendEmbed(interaction, {
          color: "Green",
          title: "Success",
          description: `\`\`\`Connecting to ${member.voice.channel.name}...\`\`\``,
          footer: client.getFooter(interaction),
        }, ephemeral).then((msg) => {
          if (!ephemeral) setTimeout(() => msg.delete(), 2500);
        });

        await queue?.connect(member.voice.channel);
      }

      results.playlist ? queue?.addTrack(results.tracks) : queue?.addTrack(results.tracks[0]);

      if (!queue?.isPlaying()) await queue?.node.play();

      return await client.sendEmbed(interaction, {
        color: "Green",
        title: "Success",
        description: `\`\`\`Playing ${results.playlist ? results.tracks.length : results.tracks[0].title}...\`\`\``,
        footer: client.getFooter(interaction),
      }, ephemeral);
    } catch (error) {
      CatchError.print(error);

      return await client.sendEmbed(interaction, {
        color: "Red",
        title: "Error",
        description: "```Something went wrong! Failed to play the song.```",
        footer: client.getFooter(interaction),
      }, ephemeral);
    }
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

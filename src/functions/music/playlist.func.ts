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
  const { client, interaction } = data;

  const guild = interaction.guild;
  const ephemeral = interaction instanceof ChatInputCommandInteraction;

  if (!guild) return await client.sendEmbed(interaction, {
    color: "Red",
    title: "Error",
    description: "```We can't find your guild data!```",
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

  let tracksQueue;
  const tracks = queue.tracks.map((track, index) => `${++index}. ${track.title}`);
  const currentSong = `Now Playing: ${queue.currentTrack?.title}\n\n`;

  if (tracks.length < 1) {
    tracksQueue = "------------------------------";
  } else if (tracks.length > 9) {
    tracksQueue = tracks.slice(0, 10).join("\n");
    tracksQueue += `\nand ${tracks.length - 10} other songs`;
  } else {
    tracksQueue = tracks.join("\n");
  }

  const loopMode = queue.repeatMode ? (queue.repeatMode == 2 ? "All" : "Single") : "Off";

  return await client.sendEmbed(interaction, {
    color: "Blue",
    title: "Playlist",
    fields: [
      { name: currentSong, value: tracksQueue, inline: false }
    ],
    description: `\nLoop: ${loopMode}`,
    footer: client.getFooter(interaction),
  }, ephemeral);
}

export default main;

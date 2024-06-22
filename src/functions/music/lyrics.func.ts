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
import cheerio from "cheerio";
import { axios } from "@services";
import { ICommandParam } from "@interfaces";
import CatchError from "@classes/CatchError";
import { ChatInputCommandInteraction } from "discord.js";

const main = async (data: ICommandParam) => {
  const { client, interaction } = data;

  const guild = interaction.guild;
  const member = interaction.member;
  const genius_token = client.config.genius.token;
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

    const api = axios(`https://api.genius.com/search?access_token=${genius_token}&q=`, {
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0"
      }
    });

    const title = queue.currentTrack?.title;
    const artist = queue.currentTrack?.author;

    if (!title || !artist) return await client.sendEmbed(interaction, {
      color: "Red",
      title: "Error",
      description: "```Something went wrong! Voice data not found!```",
      footer: client.getFooter(interaction),
    }, ephemeral);

    return api.get(`${title} ${artist}`).then(async (response) => {
      const data = response.data;
      const hits = data.response.hits;

      if (hits.length === 0) return await client.sendEmbed(interaction, {
        color: "Red",
        title: "Error",
        description: "```No lyrics found!```",
        footer: client.getFooter(interaction),
      }, ephemeral);

      const song = hits[0].result;
      const url = song.url;

      if (!url) return await client.sendEmbed(interaction, {
        color: "Red",
        title: "Error",
        description: "```No lyrics found!```",
        footer: client.getFooter(interaction),
      }, ephemeral);

      const res = await fetch(url);
      const text = await res.text();
      const $ = cheerio.load(text);

      let lyrics = $('div[class="lyrics"]').text().trim();

      if (!lyrics) {
        lyrics = '';

        $('div[class^="Lyrics__Container"]').each((_, elem) => {
          if ($(elem).text().length !== 0) {
            let snippet = $(elem)
              .html()
              ?.replace(/<br>/g, '\n')
              .replace(/<(?!\s*br\s*\/?)[^>]+>/gi, '') || "";
            lyrics += $('<textarea/>').html(snippet).text().trim() + '\n\n';
          }
        });
      }

      if (!lyrics) return await client.sendEmbed(interaction, {
        color: "Red",
        title: "Error",
        description: "```No lyrics found!```",
        footer: client.getFooter(interaction),
      }, ephemeral);

      return await client.sendEmbed(interaction, {
        color: "Blue",
        title: song.title,
        description: lyrics,
        url: song.url,
        footer: client.getFooter(interaction),
      }, ephemeral);
    }).catch(async (error: unknown) => {
      CatchError.print(error);
      return await client.sendEmbed(interaction, {
        color: "Red",
        title: "Error",
        description: "```Something went wrong, please try again later.```",
        footer: client.getFooter(interaction),
      }, ephemeral);
    });
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

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
import { axios } from "@services";
import { ICommandParam } from "@interfaces";
import CatchError from "@classes/CatchError";
import { ChatInputCommandInteraction } from "discord.js";

const main = async (data: ICommandParam) => {
  const { client, interaction } = data;

  const ephemeral = interaction instanceof ChatInputCommandInteraction;

  const api = axios("https://api.thecatapi.com/v1");

  api.get("/images/search").then(async (response) => {
    const { url } = response.data[0];

    await client.sendEmbed(interaction, {
      color: "Aqua",
      title: "Cute Cat",
      image: url,
      footer: client.getFooter(interaction)
    }, ephemeral);
  }).catch(async (error: unknown) => {
    CatchError.print(error);

    await client.sendEmbed(interaction, {
      color: "Red",
      title: "Error",
      description: "Something went wrong, please try again later.",
      footer: client.getFooter(interaction)
    }, ephemeral);
  })
}

export default main;

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

  const ephemeral = interaction instanceof ChatInputCommandInteraction;
  const latency = Date.now() - interaction.createdTimestamp;
  const apiLatency = Math.round(client.ws.ping);

  return await client.sendEmbed(interaction, {
    color: "Blue",
    title: `${client.config.emoji.pingPong} Pong!`,
    description: `\`\`\`Latency: ${latency}ms\nAPI Latency: ${apiLatency}ms\`\`\``,
    footer: client.getFooter(interaction),
  }, ephemeral);
}

export default main;

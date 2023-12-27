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
import { parseDur } from "@utils";
import { ICommandParam } from "@interfaces";
import { ChatInputCommandInteraction } from "discord.js";

const main = async (data: ICommandParam) => {
  const { client, interaction } = data;

  const ephemeral = interaction instanceof ChatInputCommandInteraction;
  const uptime = parseDur(client.uptime!);

  return await client.sendEmbed(interaction, {
    color: "Blue",
    title: `${client.config.emoji.clock} Uptime`,
    description: `\`\`\`Uptime: ${uptime}\`\`\``,
    footer: client.getFooter(interaction),
  }, ephemeral);
}

export default main;

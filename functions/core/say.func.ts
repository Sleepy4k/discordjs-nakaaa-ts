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

  const ephemeral = interaction instanceof ChatInputCommandInteraction;
  const say = ephemeral ? interaction.options.getString("text", true) : args?.join(" ")?.toLowerCase();

  if (!say) return await client.sendEmbed(interaction, {
    color: "Red",
    title: "Say",
    description: `\`\`\`Usage: ${prefix}say <text>\`\`\``,
    footer: client.getFooter(interaction),
  }, ephemeral);

  return await client.sendEmbed(interaction, {
    color: "Navy",
    description: `\`\`\`${say}\`\`\``,
    footer: client.getFooter(interaction, "basic"),
  }, ephemeral);
};

export default main;

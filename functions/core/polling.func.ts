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
  const polling = ephemeral ? interaction.options.getString("polling", true) : args?.join(" ")?.toLowerCase();

  if (!polling) return client.sendEmbed(interaction, {
    color: "Red",
    title: "Polling",
    description: `\`\`\`Usage: ${prefix}polling <polling>\`\`\``,
    footer: client.getFooter(interaction),
  }, ephemeral);

  const poll = await client.sendEmbed(interaction, {
    color: "Gold",
    title: "Polling",
    description: `\`\`\`${polling}\`\`\``,
    footer: client.getFooter(interaction),
  }, false, true);

  if ('react' in poll) {
    await poll.react("👍");
    await poll.react("👎");
    return;
  } else return client.sendEmbed(interaction, {
    color: "Red",
    title: "Something went wrong!",
    description: "Polling message is not a message!",
    footer: client.getFooter(interaction)
  }, ephemeral);
};

export default main;

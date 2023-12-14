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

  const validAnswer = ["heads", "tails"];
  const result = Math.floor(Math.random() * 2);
  const ephemeral = interaction instanceof ChatInputCommandInteraction;
  const answer = ephemeral ? interaction.options.getString("guess", true) : args?.join(" ")?.toLowerCase();

  if (!answer || !validAnswer.includes(answer)) return client.sendEmbed(interaction, {
    color: "Red",
    title: "Coin flip",
    description: `\`\`\`Usage: ${prefix}coin <Heads/Tails>\`\`\``,
    footer: client.getFooter(interaction),
  }, ephemeral);

  const coin = (result === 0) ? "heads" : "tails";

  if (coin === answer) return client.sendEmbed(interaction, {
    color: "Green",
    title: "Coin flip",
    description: `\`\`\`Result: ${coin} \nGuess: ${answer} \nStatus: You win!\`\`\``,
    footer: client.getFooter(interaction),
  }, ephemeral);

  return client.sendEmbed(interaction, {
    color: "Red",
    title: "Coin flip",
    description: `\`\`\`Result: ${coin} \nGuess: ${answer} \nStatus: You lose!\`\`\``,
    footer: client.getFooter(interaction),
  }, ephemeral);
}

export default main;

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
import { inspect } from "util";
import { Bot } from "@server/bot";
import { Event } from "@templates";
import { EmbedBuilder, Events, WebhookClient } from "discord.js";

export default new Event({
  name: Events.Error,

  run: async (client: Bot, error: Error) => {
    if (!client.config.anti_crash.enable) return;

    const webhook = new WebhookClient({
      url: client.config.anti_crash.webhook.url
    });

    const embed = new EmbedBuilder()
      .setColor("Red")
      .setTitle("Error")
      .setDescription(`\`\`\`${inspect(error, { depth: 0 }).slice(0, 1000)}\`\`\``)
      .setURL("https://discordjs.guide/popular-topics/errors.html#api-errors")
      .setTimestamp();

    return await webhook.send({
      embeds: [embed]
    });
  }
});

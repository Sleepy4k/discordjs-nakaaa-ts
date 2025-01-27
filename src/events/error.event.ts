import Bot from "@modules/bot.js";
import Event from "@templates/event.js";
import { EmbedBuilder, Events, WebhookClient } from "discord.js";

export default new Event({
  name: Events.Error,

  run: async (client: Bot, error: Error) => {
    const { enable, webhook } = client.config.crash_report;
    if (!enable) return;

    const webhookClient = new WebhookClient({
      url: webhook.url,
    });

    const embed = new EmbedBuilder()
      .setColor("Red")
      .setTitle("An error occurred")
      .setDescription(`\`\`\`js\n${error.stack}\`\`\``)
      .setURL("https://discordjs.guide/popular-topics/errors.html#api-errors")
      .setTimestamp();

    await webhookClient.send({
      embeds: [embed],
    });
    return;
  }
});
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
import os from "os";
import moment from "moment";
import cpuStat from "cpu-stat";
import { EOSType } from "@enums";
import { parseDur } from "@utils";
import { ICommandParam } from "@interfaces";
import CatchError from "@classes/CatchError";
import { version, ChatInputCommandInteraction } from "discord.js";

const main = async (data: ICommandParam) => {
  const { client, interaction } = data;

  const userClient = client.user;
  const botUptime = client.uptime || 0;

  if (!userClient) return client.sendEmbed(interaction, {
    color: "Red",
    title: "Something went wrong!",
    description: "Client or client user is undefined!",
    footer: client.getFooter(interaction)
  }, true);

  const ephemeral = interaction instanceof ChatInputCommandInteraction;

  try {
    return cpuStat.usagePercent(async (error: unknown, percent: number) => {
      if (error) {
        CatchError.print(error);
  
        return client.sendEmbed(interaction, {
          color: "Red",
          title: "Something went wrong!",
          description: `\`\`\`${error}\`\`\``,
          footer: client.getFooter(interaction)
        }, ephemeral);
      };
  
      return client.sendEmbed(interaction, {
        color: "Blue",
        title: "Bot Information",
        footer: client.getFooter(interaction),
        thumbnail: userClient.displayAvatarURL({
          forceStatic: false,
          size: 512
        }),
        fields: [
          {
            name: "============================",
            value: "**GENERAL** \n**============================**",
            inline: false,
          },
          {
            name: "🗿 Bot Name",
            value: `\`\`\`${userClient.tag}\`\`\``,
            inline: false,
          },
          {
            name: "📇 Bot ID",
            value: `\`\`\`${userClient.id}\`\`\``,
            inline: false,
          },
          {
            name: "🌐 Servers",
            value: `\`\`\`${client.guilds.cache.size.toLocaleString()} Servers\`\`\``,
            inline: false,
          },
          {
            name: "👥 Users",
            value: `\`\`\`${client.users.cache.size.toLocaleString()} Users\`\`\``,
            inline: false,
          },
          {
            name: "📺 Channels",
            value: `\`\`\`${client.channels.cache.size.toLocaleString()} Channels\`\`\``,
            inline: false,
          },
          {
            name: "============================",
            value: "**SYSTEM** \n**============================**",
            inline: false,
          },
          {
            name: "📡 Platform",
            value: `\`\`\`${EOSType[os.platform()]}\`\`\``,
            inline: false,
          },
          {
            name: "📇 Node.js",
            value: `\`\`\`${process.version}\`\`\``,
            inline: false,
          },
          {
            name: "🌐 Discord.js",
            value: `\`\`\`v${version}\`\`\``,
            inline: false,
          },
          {
            name: "📟 CPU",
            value: `\`\`\`md\n${
              os.cpus().map((i) => `${i.model}`)[0]
            }\`\`\``,
            inline: false,
          },
          {
            name: "📟 CPU usage",
            value: `\`\`\`${percent.toFixed(2)}%\`\`\``,
            inline: false,
          },
          {
            name: "📟 Arch",
            value: `\`\`\`${os.arch()}\`\`\``,
            inline: false,
          },
          {
            name: "📟 Cores",
            value: `\`\`\`${os.cpus().length}\`\`\``,
            inline: false,
          },
          {
            name: "📟 CPU Speed",
            value: `\`\`\`${
              os.cpus().map((i) => `${i.speed}`)[0]
            }MHz\`\`\``,
            inline: false,
          },
          {
            name: "📡 Memory Usage",
            value: `\`\`\`${(
              process.memoryUsage().heapUsed /
              1024 /
              1024
            ).toFixed(2)} MB\`\`\``,
            inline: false,
          },
          {
            name: "============================",
            value: "**OTHER** \n**============================**",
            inline: false,
          },
          {
            name: "📅 Ping",
            value: `\`\`\`${client.ws.ping}ms\`\`\``,
            inline: false,
          },
          {
            name: "📅 Prefix",
            value: `\`\`\`${client.config.bot.prefix}\`\`\``,
            inline: false,
          },
          {
            name: "📅 Uptime",
            value: `\`\`\`${parseDur(botUptime)}\`\`\``,
            inline: false,
          },
          {
            name: "📅 Created at",
            value: `\`\`\`${moment(userClient.createdTimestamp).format(
              "MMMM Do YYYY, h:mm:ss"
            )} | ${Math.floor(
              (Date.now() - userClient.createdTimestamp) / 86400000
            )} days(s) ago\`\`\``,
            inline: false,
          },
        ]
      }, ephemeral);
    });
  } catch (error) {
    CatchError.print(error);

    return client.sendEmbed(interaction, {
      color: "Red",
      title: "Something went wrong!",
      description: `\`\`\`${error}\`\`\``,
      footer: client.getFooter(interaction)
    }, ephemeral);
  }
};

export default main;

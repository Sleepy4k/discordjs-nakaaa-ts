import CatchError from "@classes/CatchError.js";
import Command from "@templates/Command.js";
import { version, ChatInputCommandInteraction, Message } from "discord.js";
import moment from "moment";
import os from "os";
import { getHumanReadableDate } from "@utils/parse.js";
import EOSType from "@enums/EOSType.js";
import { usagePercent } from "cpu-stat";
import TBotClient from "@interfaces/botClient.js";

export default new Command({
  /**
   * Event name
   * @type {string}
   */
  name: "bot",

  /**
   * If enable slash command
   * @type {boolean}
   */
  enableSlash: true,

  /**
   * Event name alias
   * @type {string | string[]}
   */
  aliases: ["botinfo", "bot-info", "info"],

  /**
   * Event description
   * @type {string}
   */
  description: "Show bot information.",

  /**
   * Event category
   * @type {string}
   */
  category: "core",

  /**
   * Event cooldown
   * @type {number}
   */
  cooldown: 5,

  /**
   * Event function
   * @type {TCommandFunc}
   */
  run: async (
    client: TBotClient,
    interaction: Message | ChatInputCommandInteraction,
    _args: any[],
    _prefix: string
  ) => {
    const userClient = client.user;
    const botUptime = client.uptime || 0;

    if (!userClient) {
      client.sendEmbed(
        interaction,
        {
          color: "Red",
          title: "Something went wrong!",
          description: "Client or client user is undefined!",
          footer: client.getFooter(interaction),
        },
        true
      );
      return;
    }

    const ephemeral = interaction instanceof ChatInputCommandInteraction;

    try {
      return usagePercent(
        async (
          error: Error | null,
          percent: number | undefined,
          _sample: number | undefined
        ) => {
          if (error) {
            CatchError.print(error);
            client.sendEmbed(
              interaction,
              {
                color: "Red",
                title: "Something went wrong!",
                description: `\`\`\`${error}\`\`\``,
                footer: client.getFooter(interaction),
              },
              ephemeral
            );
            return;
          }

          client.sendEmbed(
            interaction,
            {
              color: "Blue",
              title: "Bot Information",
              footer: client.getFooter(interaction),
              thumbnail: userClient.displayAvatarURL({
                forceStatic: false,
                size: 512,
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
                  value: `\`\`\`${percent?.toFixed(2)}%\`\`\``,
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
                  value: `\`\`\`${getHumanReadableDate(botUptime)}\`\`\``,
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
              ],
            },
            ephemeral
          );
        }
      );
    } catch (error) {
      CatchError.print(error);

      client.sendEmbed(
        interaction,
        {
          color: "Red",
          title: "Something went wrong!",
          description: `\`\`\`${error}\`\`\``,
          footer: client.getFooter(interaction),
        },
        ephemeral
      );
    }
  },
});

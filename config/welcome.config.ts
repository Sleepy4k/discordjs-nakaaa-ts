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
import "dotenv/config.js";
import { EmbedBuilder, GuildMember } from "discord.js";

const welcome = {
  enable: process.env.WELCOME_ENABLE || true,
  channel_id: process.env.WELCOME_CHANNEL || "1083339991884767354",

  message: (member: GuildMember) => {
    const server_icon = member.guild.iconURL({ forceStatic: false, size: 512 }) || "";
    const user_avatar = member.user.displayAvatarURL({ forceStatic: false, size: 512 }) || "";

    return {
      embeds: [
        new EmbedBuilder()
          .setColor("Blue")
          .setTitle(`Hello, ${member.user.username}!`)
          .setImage(user_avatar)
          .setDescription(
            `Hi ${member} Welcome To Our Server **__${member.guild.name}__**
            \n\nEnjoy your stay here, and don't forget to read the rules first!
            \n\nIf you have any questions, please contact the staff
            \n\nHave a nice day! :smile:`
          )
          .setFooter({
            text: `${member.guild.name} | Bot by benjamin4k`,
            iconURL: server_icon,
          })
          .setTimestamp(),
      ],
    };
  }
}

export default welcome;

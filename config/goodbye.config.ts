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

const goodbye = {
  enable: process.env.GOODBYE_ENABLE || true,
  channel_id: process.env.GOODBYE_CHANNEL || "1084131071886635058",

  message: (member: GuildMember) => {
    const server_icon = member.guild.iconURL({ forceStatic: false, size: 512 }) || "";
    const user_avatar = member.user.displayAvatarURL({ forceStatic: false, size: 512 }) || "";

    return {
      embeds: [
        new EmbedBuilder()
          .setColor("Red")
          .setTitle(`Bye, ${member.user.username}!`)
          .setImage(user_avatar)
          .setDescription(
            `Hi ${member} Selamat Tinggal, Semoga Kamu Bahagia Di Tempat Baru
            \n\nJangan Lupa Untuk Mampir Lagi Ya :smile:`
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

export default goodbye;

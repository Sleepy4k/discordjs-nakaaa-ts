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
import print from "@utils/print";
import { Bot } from "@server/bot";
import regExp from "@utils/regExp";
import { Event } from "@templates";
import { EPrintType } from "@enums";
import CatchError from "@classes/CatchError";
import { Events, Message, PermissionsBitField } from "discord.js";

export default new Event({
  name: Events.MessageCreate,

  run: async (client: Bot, message: Message) => {
    if (!client.user) return;
    if (message.author.bot || !message.member || !message.guild || !message.id) return;

    const mentionPrefix = new RegExp(`^(<@!?${client.user.id}>|${regExp(client.prefix)})\\s*`);
    if (!mentionPrefix.test(message.content)) return;

    const [, matchedPrefix] = message.content.match(mentionPrefix) || [];
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    const command = args.shift()?.toLowerCase() || "";

    if (command?.length === 0 && matchedPrefix.includes(client.user.id)) {
      print(`${message.author.tag} (${message.author.id}) mention bot in ${message.guild.name} (${message.guild.id})`, EPrintType.INFO);

      return await client.sendEmbed(message, {
        description: "Kamu kenapa? kok mention aku? kangen ya? :smiling_face_with_tear:"
      });
    }

    const messageCommand = client.mcommands.get(command) || client.mcommands.find((commands) => commands.aliases && commands.aliases.includes(command));

    if (command?.length > 0 && !messageCommand && matchedPrefix.includes(client.user.id) && client.config.chatbot.token !== "") {
      if (!client.chatbot.isPuppeteerInitialized || !client.chatbot.isAIAuthenticated) return await client.sendEmbed(message, {
        title: "Chatbot not ready",
        description: `Hey ${message.author}, chatbot not ready!`,
        footer: client.getFooter(message)
      });

      const reply = await client.sendEmbed(message, {
        description: "Please wait...",
        footer: client.getFooter(message, "basic")
      });

      const response = await client.chatbot.AIChat.sendAndAwaitResponse(command, true);
      print(`${message.author.tag} (${message.author.id}) send message to chatbot '${command}' with response '${response.text}' in ${message.guild.name} (${message.guild.id})`, EPrintType.INFO);

      await reply.delete();

      return await client.sendEmbed(message, {
        description: response.text,
        footer: client.getFooter(message, "basic")
      });
    }

    if (!messageCommand) return client.sendEmbed(message, {
      title: "Command not found",
      description: `Hey ${message.author}, command \`${command}\` not found!`,
      footer: client.getFooter(message)
    });

    const botPerms = messageCommand.botPermissions;
    const userPerms = messageCommand.userPermissions;
    const messageBotPerms = message.guild.members.me;
    const messageUserPerms = message.member.permissions;
    const resolveBotPerms = PermissionsBitField.resolve(botPerms);
    const resolveUserPerms = PermissionsBitField.resolve(userPerms);

    if (typeof messageUserPerms === "string") return await client.sendEmbed(message, {
      title: "Permission Denied",
      description: `Bot can't resolve your permissions!`,
      footer: client.getFooter(message)
    });

    if (userPerms && !messageUserPerms.has(resolveUserPerms)) return await client.sendEmbed(message, {
      title: "Permission Denied",
      description: `You don't have permission to use this command!`,
      footer: client.getFooter(message)
    });
    else if (botPerms && !messageBotPerms?.permissions.has(resolveBotPerms)) return await client.sendEmbed(message, {
      title: "Permission Denied",
      description: `I don't have permission to use this command!`,
      footer: client.getFooter(message)
    });
    else if (client.cooldown(message, messageCommand) !== false) return await client.sendEmbed(message, {
      title: "Cooldown",
      description: `Hey ${message.author}, please wait **${client.cooldown(message, messageCommand)}** seconds before using this command again!`,
      footer: client.getFooter(message)
    });
    else {
      try {
        print(`${message.author.tag} (${message.author.id}) ran command ${messageCommand.name} in ${message.guild.name} (${message.guild.id})`, EPrintType.INFO);
        await messageCommand.run(client, message, args, client.prefix);
      } catch (error: unknown) {
        new CatchError(error);
      }
    }
  }
});

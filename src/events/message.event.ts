import print from "@utils/print.js";
import Event from "@templates/Event.js";
import EPrintType from "@enums/EPrintType.js";
import CatchError from "@classes/CatchError.js";
import { Events, Message, PermissionsBitField } from "discord.js";
import TBotClient from "@interfaces/botClient.js";

export default new Event({
  name: Events.MessageCreate,

  run: async (client: TBotClient, message: Message) => {
    if (!client.user) return;
    if (
      message.author.bot ||
      !message.member ||
      !message.guild ||
      !message.id
    ) return;

    const mentionPrefix = new RegExp(`^(<@!?${client.user.id}>|${client.prefix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})\\s*`);
    if (!mentionPrefix.test(message.content)) return;

    const [, matchedPrefix] = message.content.match(mentionPrefix) || [];
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    const command = args.shift()?.toLowerCase() || "";

    if (command?.length === 0 && matchedPrefix.includes(client.user.id)) {
      print(EPrintType.INFO, `${message.author.tag} (${message.author.id}) used mention prefix in ${message.guild.name} (${message.guild.id})`);

      return await client.sendEmbed(message, {
        color: "Purple",
        title: "Alooo, I'm here!",
        footer: client.getFooter(message),
        description: `My prefix in this server is \`${client.prefix}\`. Feel free to use it!`,
      });
    }

    const isCommandExists = client.messageCommands.has(command) || client.messageCommands.find((cmd) => cmd.aliases.includes(command));
    if (!isCommandExists) {
      print(EPrintType.INFO, `${message.author.tag} (${message.author.id}) tried to use an unknown command in ${message.guild.name} (${message.guild.id})`);

      return await client.sendEmbed(message, {
        color: "Red",
        title: "Whooopsie!",
        footer: client.getFooter(message),
        description: "I don't know that command. Please try again.",
      });
    }

    const messageUserPerms = message.member.permissions;
    if (typeof messageUserPerms === "string" || !(messageUserPerms instanceof PermissionsBitField)) {
      print(EPrintType.ERROR, "PermissionsBitField is not supported in this version of discord.js");

      return await client.sendEmbed(message, {
        color: "Red",
        title: "Whooopsie!",
        footer: client.getFooter(message),
        description: "I can't check your permissions. Please try again.",
      });
    }

    const messageCommand = client.messageCommands.get(command) || client.messageCommands.find((cmd) => cmd.aliases.includes(command));
    const { userPermissions } = messageCommand;
    const resolvedUserPermissions = PermissionsBitField.resolve(userPermissions);

    if (userPermissions && !messageUserPerms.has(resolvedUserPermissions)) {
      print(EPrintType.INFO, `${message.author.tag} (${message.author.id}) tried to use a command without permission in ${message.guild.name} (${message.guild.id})`);

      return await client.sendEmbed(message, {
        color: "Red",
        title: "Whooopsie!",
        footer: client.getFooter(message),
        description: "You don't have permission to use this command.",
      });
    }

    const messageBotPerms = message.guild.members.me?.permissions;
    if (typeof messageBotPerms === "string" || !(messageBotPerms instanceof PermissionsBitField)) {
      print(EPrintType.ERROR, "PermissionsBitField is not supported in this version of discord.js");

      return await client.sendEmbed(message, {
        color: "Red",
        title: "Whooopsie!",
        footer: client.getFooter(message),
        description: "I can't check my permissions. Please try again.",
      });
    }

    const { botPermissions } = messageCommand;
    const resolvedBotPermissions = PermissionsBitField.resolve(botPermissions);

    if (botPermissions && !messageBotPerms.has(resolvedBotPermissions)) {
      print(EPrintType.INFO, `${message.author.tag} (${message.author.id}) tried to use a command without permission in ${message.guild.name} (${message.guild.id})`);

      return await client.sendEmbed(message, {
        color: "Red",
        title: "Whooopsie!",
        footer: client.getFooter(message),
        description: "I don't have permission to use this command.",
      });
    }

    const messageCooldown = client.cooldown(message, messageCommand);
    if (messageCooldown && (typeof messageCooldown === 'number' && messageCooldown > 0)) {
      print(EPrintType.INFO, `${message.author.tag} (${message.author.id}) tried to use a command on cooldown in ${message.guild.name} (${message.guild.id})`);

      return await client.sendEmbed(message, {
        color: "Red",
        title: "Whooopsie!",
        footer: client.getFooter(message),
        description: `Please wait ${messageCooldown} seconds before using this command again.`,
      });
    }

    try {
      print(EPrintType.INFO, `${message.author.tag} (${message.author.id}) used ${messageCommand.name} command in ${message.guild.name} (${message.guild.id})`);

      return await messageCommand.run(client, message, args, client.prefix);
    } catch (error: unknown) {
      CatchError.print(error);

      return await client.sendEmbed(message, {
        color: "Red",
        title: "Caught an error :(",
        footer: client.getFooter(message),
        description: "Something went wrong. Please try again.",
      });
    }
  }
})

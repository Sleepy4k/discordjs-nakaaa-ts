import Event from "@templates/Event.js";
import {
  Events,
  Interaction,
  InteractionType,
  PermissionsBitField,
} from "discord.js";
import TBotClient from "@interfaces/botClient.js";
import print from "@utils/print.js";
import EPrintType from "@enums/EPrintType.js";
import CatchError from "@classes/CatchError.js";

export default new Event({
  name: Events.InteractionCreate,

  run: async (client: TBotClient, interaction: Interaction) => {
    if (!interaction.member || interaction.user.bot || !interaction.guild)
      return;
    if (interaction.type != InteractionType.ApplicationCommand) return;

    const isCommandExists = client.slashCommands.has(interaction.commandName);
    if (!isCommandExists)
      return await client.sendEmbed(
        interaction,
        {
          color: "Red",
          title: "Whooopsie!",
          description: "I don't know that command. Please try again.",
        },
        false
      );

    const interactionUserPerms = interaction.member.permissions;
    if (
      typeof interactionUserPerms === "string" ||
      !(interactionUserPerms instanceof PermissionsBitField)
    ) {
      print(
        EPrintType.ERROR,
        "PermissionsBitField is not supported in this version of discord.js"
      );

      return await client.sendEmbed(
        interaction,
        {
          color: "Red",
          title: "Whooopsie!",
          description: "I can't check your permissions. Please try again.",
        },
        false
      );
    }

    const interactionCommand = client.slashCommands.get(
      interaction.commandName
    );
    const { userPermissions } = interactionCommand;
    const resolvedUserPerms = PermissionsBitField.resolve(userPermissions);

    if (userPermissions && !interactionUserPerms.has(resolvedUserPerms)) {
      print(
        EPrintType.INFO,
        `${interaction.user.tag} (${interaction.user.id}) tried to use a command without permissions in ${interaction.guild.name} (${interaction.guild.id})`
      );

      return await client.sendEmbed(
        interaction,
        {
          color: "Red",
          title: "Whooopsie!",
          description: "You don't have permission to use this command.",
        },
        false
      );
    }

    const interactionBotPerms = interaction.guild.members.me?.permissions;
    if (
      typeof interactionBotPerms === "string" ||
      !(interactionBotPerms instanceof PermissionsBitField)
    ) {
      print(
        EPrintType.ERROR,
        "PermissionsBitField is not supported in this version of discord.js"
      );

      return await client.sendEmbed(
        interaction,
        {
          color: "Red",
          title: "Whooopsie!",
          description: "I can't check my permissions. Please try again.",
        },
        false
      );
    }

    const { botPermissions } = interactionCommand;
    const resolvedBotPerms = PermissionsBitField.resolve(botPermissions);

    if (botPermissions && !interactionBotPerms.has(resolvedBotPerms)) {
      print(
        EPrintType.INFO,
        `${interaction.user.tag} (${interaction.user.id}) tried to use a command without permissions in ${interaction.guild.name} (${interaction.guild.id})`
      );

      return await client.sendEmbed(
        interaction,
        {
          color: "Red",
          title: "Whooopsie!",
          description: "I don't have permission to use this command.",
        },
        false
      );
    }

    try {
      print(
        EPrintType.INFO,
        `${interaction.user.tag} (${interaction.user.id}) used ${interaction.commandName} command in ${interaction.guild.name} (${interaction.guild.id})`
      );
      return await interactionCommand.run(
        client,
        interaction,
        interaction.options,
        client.prefix
      );
    } catch (error) {
      CatchError.print(error);
    }
  },
});

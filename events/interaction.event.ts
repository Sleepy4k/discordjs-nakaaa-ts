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
import { Event } from "@templates";
import { EPrintType } from "@enums";
import { Events, Interaction, InteractionType, PermissionsBitField } from "discord.js";

export default new Event({
  name: Events.InteractionCreate,

  run: async (client: Bot, interaction: Interaction) => {
    if (!interaction.member || interaction.user.bot || !interaction.guild) return;
    if (interaction.type != InteractionType.ApplicationCommand) return;

    const command = client.scommands.get(interaction.commandName);

    if (!command) return await client.send(interaction, {
      content: "Command not found!",
      ephemeral: false,
      fetchReply: false
    });

    const botPerms = command.botPermissions;
    const userPerms = command.userPermissions;
    const interactionBotPerms = interaction.guild.members.me;
    const interactionUserPerms = interaction.member.permissions;
    const resolveBotPerms = PermissionsBitField.resolve(botPerms);
    const resolveUserPerms = PermissionsBitField.resolve(userPerms);

    if (typeof interactionUserPerms === "string") return await client.send(interaction, {
      content: "Bot can't resolve your permissions!",
      ephemeral: false,
      fetchReply: false
    });

    if (userPerms && !interactionUserPerms.has(resolveUserPerms)) return await client.sendEmbed(interaction, {
      title: "Permission Denied",
      description: `You don't have permission to use this command!`,
      footer: client.getFooter(interaction)
    });
    else if (botPerms && !interactionBotPerms?.permissions.has(resolveBotPerms)) return await client.sendEmbed(interaction, {
      title: "Permission Denied",
      description: `I don't have permission to use this command!`,
      footer: client.getFooter(interaction)
    });
    else {
      try {
        print(`${interaction.user.tag} (${interaction.user.id}) ran command ${command.name} in ${interaction.guild.name} (${interaction.guild.id})`, EPrintType.INFO);
        await command.run(client, interaction, interaction.options, client.prefix);
      } catch (error: unknown) {
        if (error instanceof Error) print(error.message, EPrintType.ERROR);
        else if (typeof error === "string") print(error, EPrintType.ERROR);
        else print("Unknown error", EPrintType.ERROR);
      }
    }
  }
});

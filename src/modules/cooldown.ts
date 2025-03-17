import { Collection, CommandInteraction, Message } from "discord.js";
import { ICommandFile } from "@interfaces/commandFile.js";

class Cooldown {
  public static handleCooldown(
    interaction: CommandInteraction | Message<boolean>,
    command: ICommandFile,
    cooldowns: Collection<string, any>
  ): boolean | number {
    if (!interaction || !command) return false;
    if (!command.cooldown || command.cooldown < 1) command.cooldown = 5;

    let { member } = interaction;
    if (!cooldowns.has(command.name))
      cooldowns.set(command.name, new Collection());

    const commandCooldown: Collection<string, any> = cooldowns.get(
      command.name
    );
    if (commandCooldown === undefined) return false;

    const now = Date.now();
    const currMember = member?.user.id || "0";
    const cooldownAmount = command.cooldown * 1000;
    if (commandCooldown.has(currMember)) {
      const expiredTime = commandCooldown.get(currMember) + cooldownAmount;

      if (now < expiredTime) {
        const timeLeft = (expiredTime - now) / 1000;
        return timeLeft;
      }

      commandCooldown.set(currMember, now);
      setTimeout(() => commandCooldown.delete(currMember), cooldownAmount);
      return false;
    }

    commandCooldown.set(currMember, now);
    setTimeout(() => commandCooldown.delete(currMember), cooldownAmount);
    return false;
  }
}

export default Cooldown;

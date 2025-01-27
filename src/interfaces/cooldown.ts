import Bot from "@modules/bot.js";
import {
  Message,
  ChatInputCommandInteraction
} from "discord.js";

type TCommandFunc = (
  client: Bot,
  interaction: Message|ChatInputCommandInteraction,
  args: string[],
  prefix: string
) => Promise<void>;

interface ICommandFile {
  name: string;

  alias?: string|string[];

  description: string;

  userPermissions: BigInteger;

  botPermissions: BigInteger;

  cooldown?: number; // when empty or not assigned, it will be 5 seconds

  category: string;

  run: TCommandFunc;
}

export type {
  TCommandFunc,
  ICommandFile,
}
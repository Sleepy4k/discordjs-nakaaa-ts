import { Partials } from "discord.js";

const PARTIALS_PERMS: Partials[] = [
  Partials.User, // for discord user
  Partials.Message, // for message
  Partials.Channel, // for text channel
  Partials.Reaction, // for message reaction
  Partials.GuildMember, // for guild member
  Partials.ThreadMember, // for thread member
  Partials.GuildScheduledEvent, // for guild events
];

export default PARTIALS_PERMS;

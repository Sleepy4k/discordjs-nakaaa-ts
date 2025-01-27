import { GatewayIntentBits } from "discord.js";

const GATEWAY_INTENT_BITS: GatewayIntentBits[] = [
  GatewayIntentBits.Guilds, // for guild related things
  GatewayIntentBits.GuildMembers, // for guild members related things
  GatewayIntentBits.GuildInvites, // for guild invite managing
  GatewayIntentBits.GuildMessages, // for guild messages things
  GatewayIntentBits.GuildWebhooks, // for discord webhooks
  GatewayIntentBits.MessageContent, // enable if you need message content things
  GatewayIntentBits.DirectMessages, // for dm messages
  GatewayIntentBits.GuildPresences, // for user presence things
  GatewayIntentBits.GuildVoiceStates, // for voice related things
  GatewayIntentBits.GuildIntegrations, // for discord Integrations
  GatewayIntentBits.GuildMessageTyping, // for message typing things
  GatewayIntentBits.DirectMessageTyping, // for dm message typinh
  GatewayIntentBits.GuildMessageReactions, // for message reactions things
  GatewayIntentBits.GuildEmojisAndStickers, // for manage emojis and stickers
  GatewayIntentBits.DirectMessageReactions, // for dm message reaction
];

export default GATEWAY_INTENT_BITS;

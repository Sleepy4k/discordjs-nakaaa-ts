import { ClientPresenceStatus } from "discord.js";
import "dotenv/config.js";

const bot = {
  name: process.env.BOT_NAME || "Sleepy4k",
  icon: process.env.BOT_ICON || "https://i.imgur.com/8Q9ZQ2M.png",
  token: process.env.BOT_TOKEN || "",
  prefix: process.env.BOT_PREFIX || "$",
  author: process.env.BOT_AUTHOR || "benjamin4k",
  browser: process.env.BOT_BROWSER || "Discord iOS"
};

const activity = {
  type: (process.env.ACTIVITY_TYPE || "WATCHING") as ClientPresenceStatus,
  name: process.env.ACTIVITY_NAME || "you sleep"
};

const crash_report = {
  enable: process.env.CRASH_REPORT_ENABLE || false,
  webhook: {
    url: process.env.CRASH_REPORT_WEBHOOK || ""
  }
};

const slash = {
  global: process.env.SLASH_GLOBAL || true,
  guild: process.env.SLASH_GUILD || ""
};

const BotClientConfig = {
  bot,
  activity,
  crash_report,
  slash
};

export default BotClientConfig;
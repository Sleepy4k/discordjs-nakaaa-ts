import print from "@utils/print.js";
import { ActivityType, Events } from "discord.js";
import EPrintType from "@enums/EPrintType.js";
import CatchError from "@classes/CatchError.js";
import Event from "@templates/Event.js";
import TBotClient from "@interfaces/botClient.js";

export default new Event({
  name: Events.ClientReady,

  run: async (client: TBotClient) => {
    if (!client.user) return;

    print(EPrintType.INFO, `${client.user.tag}: Ready to serve ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);

    try {
      client.user.setPresence({
        afk: false,
        status: client.config.activity.type,
        activities: [
          {
            name: client.config.activity.name,
            type: ActivityType.Watching
          }
        ]
      });
    } catch (error: unknown) {
      CatchError.print(error);
    }
  }
})
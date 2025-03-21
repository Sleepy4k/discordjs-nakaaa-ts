import PARTIALS_PERMS from "@constants/partials-perms.js";
import GATEWAY_INTENT_BITS from "@constants/gateway-bits.js";
import type { ClientOptions } from "discord.js";

const ClientConfig: ClientOptions = {
  shards: 'auto',
  closeTimeout: 60000,
  failIfNotExists: false,
  allowedMentions: {
    users: [],
    roles: [],
    repliedUser: true,
    parse: [
      'users',
      'roles',
      'everyone'
    ],
  },
  intents: GATEWAY_INTENT_BITS,
  partials: PARTIALS_PERMS
}

export default ClientConfig;

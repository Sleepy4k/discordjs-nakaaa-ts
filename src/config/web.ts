import "dotenv/config.js";

const WebConfig = {
  hostname: process.env.WEB_HOSTNAME || "localhost",
  port: process.env.WEB_PORT || "3000",
  env: process.env.WEB_ENV || "development",
  name: process.env.WEB_NAME || "Sleepy4k"
};

export default WebConfig;

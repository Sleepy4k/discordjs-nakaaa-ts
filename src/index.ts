import Bot from '@modules/bot.js';

Bot.createInstace().then(async (client) => {
  await client.build();
  await client.start();
});

import Bot from '@modules/bot.js';

const client: Bot = await Bot.createInstace();

await client.build().then(() => {
  client.start();
});
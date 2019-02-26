const TelegramBot = require('node-telegram-bot-api'),
    request = require('request'),
    token = '726828250:AAF0sS4Eo84mBC5zd5brba1ayioIewQ1uaI';

const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/test/, (msg, match) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, "prinal");
});

 bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(466176964, msg.text);
  console.log(msg);
});


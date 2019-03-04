import Telegram from "node-telegram-bot-api"
import { config } from "./config"
import { Log } from "@uk/log"
import { settings } from "./settings"

const log = new Log(__filename);
const bot = new Telegram(config.TELEGRAM_BOT_TOKEN, { polling: true });

bot.onText(/\/echo (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    if (match) {
        const resp = match[1];
        bot.sendMessage(chatId, resp);
    }
});

bot.on('message', (msg) => {
    log.debug('onMessage', msg);
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Received your message');
    let amount = +msg.text!.replace(/,/, ".");
    if (isNaN(amount)) {
        bot.sendMessage(chatId, "Сумма должна быть числом");
        return;
    }
    if (amount > settings.maxDonateAmount) {
        bot.sendMessage(chatId, "Сумма должно быть меньше 100");
        return;
    }
    if (amount < settings.minDonateAmount) {
        bot.sendMessage(chatId, "Сумма должно быть больше 10");
        return;
    }
    amount = Math.ceil(amount * 100);

    bot.sendInvoice(chatId, settings.messages.productName, settings.messages.productDescription, "123", config.PAYMENT_PROVIDER_TOKEN, "4356", config.CURRENCY, [{
        amount,
        label: settings.messages.priceLabel
    }], {
        need_email: true
    });
});

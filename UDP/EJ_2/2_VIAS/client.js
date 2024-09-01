import dgram from 'node:dgram';
import { HOST, SERVER_PORT } from './auxiliares.js';

// Crear un socket UDP
const client = dgram.createSocket('udp4');

// Mensaje a enviar
const message = Buffer.from('Mensaje desde el cliente via datagrama UDP');

// Enviar el mensaje
client.send(message, SERVER_PORT, HOST, (err) => {
  if (err) {
    console.error(`Error al enviar el mensaje: ${err.message}`);
    client.close();
  } else {
    console.log('Mensaje enviado');

    // Esperar una respuesta del servidor
    client.on('message', (msg, rinfo) => {
      console.log(`Respuesta del servidor: ${msg} desde ${rinfo.address}:${rinfo.port}`);
      client.close();
    });
  }
});

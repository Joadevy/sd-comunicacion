import dgram from 'node:dgram';
import { HOST, SERVER_PORT } from './auxiliares.js';

// Crear un socket UDP
const client = dgram.createSocket('udp4');

// Mensaje a enviar
const message = Buffer.from('Mensaje desde el cliente');

// Enviar el mensaje
client.send(message, SERVER_PORT, HOST, (err) => {
  if (err) {
    console.error(`Error al enviar el mensaje: ${err.message}`);
    client.close();
  } else {
    console.log('Mensaje enviado');

    // Esperar la confirmación de recepción del servidor
    client.once('message', (confirmation, rinfo) => {
      console.log(`Confirmación de recepción recibida: ${confirmation} desde ${rinfo.address}:${rinfo.port}`);

      // Enviar el mensaje de confirmación final
      const finalConfirmation = Buffer.from('Confirmación final del cliente');
      client.send(finalConfirmation, SERVER_PORT, HOST, (err) => {
        if (err) {
          console.error(`Error al enviar la confirmación final: ${err.message}`);
          client.close();
        } else {
          console.log('Confirmación final enviada');

          // Esperar la confirmación final del servidor
          client.once('message', (finalConfirmation, rinfo) => {
            console.log(`Confirmación final recibida: ${finalConfirmation} desde ${rinfo.address}:${rinfo.port}`);
            client.close();
          });
        }
      });
    });
  }
});

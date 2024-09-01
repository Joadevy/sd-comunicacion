import dgram from 'node:dgram';
import { HOST, SERVER_PORT } from './auxiliares.js';

// Crear un socket UDP
const server = dgram.createSocket('udp4');

// Configurar la recepción de mensajes
server.on('message', (msg, rinfo) => {
  console.log(`Servidor recibió: ${msg} desde ${rinfo.address}:${rinfo.port}`);

  // Enviar una confirmación de recepción al cliente
  const confirmation = Buffer.from('Recepción confirmada');
  server.send(confirmation, rinfo.port, rinfo.address, (err) => {
    if (err) {
      console.error(`Error al enviar la confirmación: ${err.message}`);
    } else {
      console.log('Confirmación enviada');

      // Esperar el mensaje de confirmación final del cliente
      server.once('message', (finalMsg, finalRinfo) => {
        console.log(`Confirmación final recibida: ${finalMsg} desde ${finalRinfo.address}:${finalRinfo.port}`);

        // Enviar una confirmación final al cliente
        const finalConfirmation = Buffer.from('Confirmación final recibida');
        server.send(finalConfirmation, finalRinfo.port, finalRinfo.address, (err) => {
          if (err) {
            console.error(`Error al enviar la confirmación final: ${err.message}`);
          } else {
            console.log('Confirmación final enviada');
          }
        });
      });
    }
  });
});

// Manejar errores
server.on('error', (err) => {
  console.error(`Error en el servidor:\n${err.stack}`);
  server.close();
});

// Configurar el servidor para escuchar en un puerto específico
server.bind(SERVER_PORT, HOST, () => {
  console.log(`Servidor UDP escuchando en ${HOST}:${SERVER_PORT}`);
});

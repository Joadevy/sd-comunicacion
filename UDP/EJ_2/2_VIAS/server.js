import dgram from 'node:dgram';
import { HOST, SERVER_PORT } from './auxiliares.js';

// Crear un socket UDP
const server = dgram.createSocket('udp4');

// Configurar la recepción de mensajes
server.on('message', (msg, rinfo) => {
  console.log(`Servidor recibió: ${msg} desde ${rinfo.address}:${rinfo.port}`);
  
  // Enviar una respuesta al cliente
  const response = Buffer.from('Mensaje recibido');
  server.send(response, rinfo.port, rinfo.address, (err) => {
    if (err) {
      console.error(`Error al enviar la respuesta: ${err.message}`);
    } else {
      console.log('Respuesta enviada');
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

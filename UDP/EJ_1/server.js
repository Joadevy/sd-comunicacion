import dgram from 'node:dgram';

const server = dgram.createSocket('udp4');

server.on('message', (msg, rinfo) => {
  console.log(`Mensaje recibido: ${msg} de ${rinfo.address}:${rinfo.port}`);
});

// Manejar errores
server.on('error', (err) => {
  console.error(`Error en el servidor:\n${err.stack}`);
  server.close();
});

const PORT = 8080;
const HOST = '127.0.0.1';
server.bind(PORT, HOST, () => {
  console.log(`Servidor UDP escuchando en ${HOST}:${PORT}`);
});
import net from 'node:net';

const server = net.createServer((socket) => {
  console.log('Nuevo cliente conectado')

  socket.on("data", (data) => {
    console.log('Mensaje del cliente:', data.toString());

    if (data.toString().trim().toLowerCase() === 'close') {
      socket.end('Conexion cerrada');
    }

    socket.write('Mensaje recibido: ' + data.toString() + '. Envie CLOSE para cerrar conexion'+'\n');
  });

  socket.on("end", () => {
    console.log('Cliente desconectado')
  });
});

server.listen(1337, 'localhost', () => {
  console.log('Servidor escuchando en puerto 1337');
});
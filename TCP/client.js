import net from 'node:net';

const client = new net.Socket();
client.connect(1337, 'localhost', () => {
  console.log('Conectado al servidor');

  process.stdin.on('data', (data) => {
    client.write(data.toString().trim());
  });

  client.on('data', (data) => {
    console.log('Mensaje del server:', data.toString());

    if (data.toString().trim().toLowerCase() === 'Conexion cerrada') {
      client.end('Conexion cerrada');
    }
  });
});
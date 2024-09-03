## Sistemas distribuidos
1. Utilice la interfaz socket con servicio de datagramas para enviar y recibir mensajes de texto entre
dos computadoras. (En carpeta UDP)
2. Implemente un protocolo petición-respuesta para la comunicación entre dos procesos utilizando sockets. Implementar protocolos de 2,3 y 4 vías. Considere que cada proceso envía y recibe mensajes en puertos distintos. (En carpeta UDP)
3. Implemente una interfaz de comunicación confiable con sockets TCP. (En carpeta TCP)

## Como ejecutar
Esta pensado para ejecutar directamente en la terminal usando node o el equivalente en el entorno de ejecucion de javascript de preferencia (se utilizo bun particularmente)
1. En la primera terminal, ejecuta el servidor:
   ```bash
   node server.js
   ```
2. En la segunda terminal, ejecuta el cliente:
    ```bash
   node client.js
   ```
En algunos ejemplos, como la aplicacion con sockets TCP, se propone una "interactividad" en la aplicacion cliente 

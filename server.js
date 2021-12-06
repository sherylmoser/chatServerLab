const net = require('net');

const server = net.createServer((client) => {
    client.write('Welcome to the chat room')
    client.on('end', () => {
        console.log('client disconnected');
    });
    client.pipe(client);
}).listen(5000);

console.log('listening on port 5000');
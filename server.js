const net = require('net');

const clients = [];
let count = 0;

const server = net.createServer((client) => {
    client.write('Welcome to the chat room');
    client.id = count;
    clients.push(client);
    count++;
    client.on('data', (data) => {
        clients.forEach((currClient) => {
            if (currClient === client) {
                console.log(`client${client.id}: ${data}`);
            }
            if (currClient !== client) {
                currClient.write(`client${client.id}: ${data}`)
            }
        })

    })
    client.on('end', () => {
        console.log('client disconnected');
        clients.filter(currClient => {
            currClient !== client
        })
        clients.forEach(currClient => {
            currClient.write(`client${client.id} has left the chat`)
        })
    });
}).listen(4000, () => {
    console.log('listening on port 4000');
});

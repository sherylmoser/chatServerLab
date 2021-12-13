const net = require('net');

const clients = [];
let count = 0;

const server = net.createServer((client) => {
    client.write('Welcome to the chat room');
    clients.push({ client: client, id: count });
    console.log(clients);
    count++;
    // console.log(count);
    server.on('connection', (client) => {

    })
    client.on('data', (data) => {
        clients.forEach((user) => {
            if (user.client == client) {
                // console.log(user.id);
                console.log(`client${user.id}: ${data}`);
            }
        })
    })
    client.on('end', () => {
        console.log('client disconnected', clients.length);
        // count--;
        clients.forEach((user) => {
            if (user.client == client) {
                let id = user.id
                clients.splice(id, 1)
            }
        })
        console.log(`new array length is ${clients.length}`)
    });
}).listen(4000, () => {
    console.log('listening on port 4000');
});

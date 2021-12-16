const net = require('net');

const clients = [];
let count = 0;

const server = net.createServer((client) => {
    client.write('Welcome to the chat room');
    client.id = count;
    clients.push(client);
    // console.log(clients);
    count++;
    // console.log(count);
    client.on('data', (data) => {
        clients.forEach((user) => {
            if (user === client) {
                // console.log(user.id);
                console.log(`client${client.id}: ${data}`);
            }
            if (user !== client) {
                user.write(`client${client.id}: ${data}`)
            }
        })

    })
    client.on('end', () => {
        console.log('client disconnected', clients.length);
        // count--;
        clients.forEach((user) => {
            if (user === client) {
                let id = client.id
                clients.splice(id, 1)
            }
            if (user !== client) {
                user.write(`client${client.id} has left the chat`)
            }
        })
        // console.log(`new array length is ${clients.length}`)
    });
}).listen(4000, () => {
    console.log('listening on port 4000');
});

const net = require('net');

const client = net.createConnection({ port: 5000 }, () => {
    console.log('connected');
});

client.on('data', (data) => {
    console.log(data.toString());
})
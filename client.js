const net = require('net');



const client = net.createConnection({ port: 4000 }, () => {
    console.log('connected');
    client.on('data', (data) => {
        console.log(data.toString().trim())
    })
});
let input = process.stdin;
input.on('data', (data) => {
    client.write(`${data.toString().trim()}`)
})

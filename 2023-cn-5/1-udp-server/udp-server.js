const dgram = require('dgram');
const server = dgram.createSocket('udp4');
console.log("run")
// Lytter til beskeder fra klienten
server.on('message', function (message, remote) {
    console.log('Received', message.toString());
    
    // Svare tilbage til klienten
    const reply = 'pong';
    console.log('Replying with', reply)
    server.send(reply, 0, reply.length, remote.port, remote.address);
});

server.bind(3000,"localhost");
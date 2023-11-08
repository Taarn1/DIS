const dgram = require('dgram');
const client = dgram.createSocket('udp4');

const message = "ping"
const sendMessage = (address) =>{
    timestamp = Date.now();
    client.send(message, 0, message.length, 41234, address,
        function (err, bytes) {
        if (err) {
            throw err;
        }
        console.log("Wrote " + bytes + " bytes to socket.");
    });
    client.on('message', (reply) =>{
        console.log('Received', reply.toString());
        const receivedTime = Date.now();
        const roundTripTime = receivedTime - timestamp;
        console.log('Round trip time:', roundTripTime, 'ms');
    });
}
sendMessage("142.93.172.19")


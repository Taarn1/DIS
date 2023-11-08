const express = require('express');
const proxy = require('express-http-proxy');

const app = express();
const server1 = express();
const server2 = express();
const server3 = express();
const server4 = express();
const ports = [3001, 3002, 3003, 3004];

//implement a load balancer
const balancer = () => {
    let port = ports.shift();
    console.log(port);
    let res = `http://localhost:${port}`;
    console.log(res);
    ports.push(port);
    console.log(ports);
    return res;
}

app.use('/', proxy(balancer()));

//servers
server1.get('/', (req, res) => res.send(`address is localhost and port is ${3001}`));
server2.get('/', (req, res) => res.send(`address is localhost and port is ${3002}`));
server3.get('/', (req, res) => res.send(`address is localhost and port is ${3003}`));
server4.get('/', (req, res) => res.send(`address is localhost and port is ${3004}`));

app.listen(4000,()=>console.log(`server listening on port ${4000}!`));
server1.listen(3001, () => console.log(`server1 listening on port ${3001}!`));
server2.listen(3002, () => console.log(`server2 listening on port ${3002}!`));
server3.listen(3003, () => console.log(`server3 listening on port ${3003}!`));
server4.listen(3004, () => console.log(`server4 listening on port ${3004}!`));

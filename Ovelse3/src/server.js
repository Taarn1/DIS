const express = require("express");
const bodyParser = require('body-parser');

const app = express();
const port = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const http = require("http").Server(app)
const io = require("socket.io")(http)
const host = "localhost"
const path = require("path")

app.use(express.static(__dirname + "../client"))

app.get("/", (req,res) =>{
  res.sendFile(path.join(__dirname, "../client/home.html"))
})

app.get("/global.css", (req,res) =>{
  res.sendFile(path.join(__dirname, "../client/global.css"))
})

app.get("/home.js", (req,res) =>{
  res.sendFile(path.join(__dirname, "../client/home.js"))
})

http.listen(port, host, () => {
  console.log(`Socket.IO server running at http://${host}:${port}/`);
});

io.on("connection", socket => {
  console.log("a user connected")
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg)
  })
})

// server = app.listen(port, () => {
//   console.log(`Server open on port ${port}`);
// });
 

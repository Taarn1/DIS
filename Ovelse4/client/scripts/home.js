const socket = io();

const messages = document.getElementById("messages");
const input = document.getElementById("input");


let username = "Anonymous"
username=getCookie("user");

function sendChat() {
  if (input.value) {
    socket.emit("chat message", username + ": " + input.value);
    input.value = "";
  }
}

socket.on("chat message", (msg) => {
  const item = document.createElement("li");
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});


socket.emit("user joined", username);

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

function changeUsername() {
  username = document.getElementById("username").value;

  if (username == "") {
    alert("Skriv et nyt brugernavn");
    return;
  } else document.cookie = `userAuth=${username}`;

  socket.emit("user joined", username);
  document.getElementById("username").value = "";
}

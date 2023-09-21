const socket = io();

const input = document.getElementById("input");
const messages = document.getElementById("messages");
function changeUsername(){

}

function sendChat(){
 if(input.value != ""){
   socket.emit('chat message', input.value);
   input.value = "";
 }
}

socket.on('chat message', (msg) => {
    //const chat = document.getElementById("chat");
    const item = document.createElement("li");
    item.innerHTML = msg;
    messages.appendChild(item);
    })
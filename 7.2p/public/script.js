const socket = io();

socket.on('updateTotal', (count) => {
    document.getElementById('totalCount').innerText = count;
});

socket.on('yourID', (id) => {
    document.getElementById('myID').innerText = id;
});

function sendMessage() {
    const input = document.getElementById('msgInput');
    const message = input.value;

    if (message.trim() !== "") {
        socket.emit('sendMsg', message);
        input.value = ''; 
    }
}

document.getElementById('msgInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});


socket.on('receiveMsg', (data) => {
    const msgDiv = document.getElementById('messages');
    

    const newMsg = document.createElement('p');
    newMsg.innerHTML = `<strong>Client ${data.id}:</strong> ${data.text}`;
    

    msgDiv.appendChild(newMsg);
    msgDiv.scrollTop = msgDiv.scrollHeight; 
});
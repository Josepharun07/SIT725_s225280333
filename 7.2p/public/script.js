const socket = io();

socket.on('updateTotal', (count) => {
    document.getElementById('totalCount').innerText = count;
});


socket.on('yourID', (id) => {
    document.getElementById('myID').innerText = id;
});
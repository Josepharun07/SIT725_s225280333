const socket = io();

// Listen for the total count (updates for everyone)
socket.on('updateTotal', (count) => {
    document.getElementById('totalCount').innerText = count;
});

// Listen for my specific number (only sent once on connection)
socket.on('yourID', (id) => {
    document.getElementById('myID').innerText = id;
});
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

let activeConnections = 0;
let connectionHistory = 0; 

io.on('connection', (socket) => {
    activeConnections++;
    connectionHistory++;
    

    const clientId = connectionHistory;

    console.log(`Client ${clientId} connected. Total: ${activeConnections}`);


    io.emit('updateTotal', activeConnections);
    socket.emit('yourID', clientId);


    socket.on('sendMsg', (msg) => {

        io.emit('receiveMsg', {
            id: clientId,
            text: msg
        });
    });

    socket.on('disconnect', () => {
        activeConnections--;
        console.log(`Client ${clientId} disconnected.`);
        io.emit('updateTotal', activeConnections);
    });
});

http.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
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
    
    const thisClientNumber = connectionHistory;

    console.log(`Client #${thisClientNumber} connected. Total active: ${activeConnections}`);

    io.emit('updateTotal', activeConnections);

    socket.emit('yourID', thisClientNumber);

    socket.on('disconnect', () => {
        activeConnections--;
        console.log(`Client #${thisClientNumber} disconnected. Total active: ${activeConnections}`);
        
        io.emit('updateTotal', activeConnections);
    });
});

http.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
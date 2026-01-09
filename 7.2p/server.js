const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

// Variables to track state
let activeConnections = 0;
let connectionHistory = 0; // Used to give a unique ID to each new client

io.on('connection', (socket) => {
    activeConnections++;
    connectionHistory++; 
    
    // Assign this specific client their number (1, 2, 3...)
    const thisClientNumber = connectionHistory;

    console.log(`Client #${thisClientNumber} connected. Total active: ${activeConnections}`);

    // 1. Send the TOTAL count to EVERYONE
    io.emit('updateTotal', activeConnections);

    // 2. Send the SPECIFIC ID only to the NEW client
    socket.emit('yourID', thisClientNumber);

    socket.on('disconnect', () => {
        activeConnections--;
        console.log(`Client #${thisClientNumber} disconnected. Total active: ${activeConnections}`);
        
        // Update the total count for everyone remaining
        io.emit('updateTotal', activeConnections);
    });
});

http.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
//This file sets up the websocket SERVER application.

import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';

//App is the function handler that we can apply to an HTTP server.
//We also create the HTTP server.
const app = express();
const server = createServer(app);
const io = new Server(server);

//Route handler that is called when we navigate to the home of our website.
const __dirname = dirname(fileURLToPath(import.meta.url));
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'client.html'));
});

io.on('connection', (socket) => {
    console.log('[Server] Client connected');
    socket.on('disconnect', () => {
        console.log('[Server] Client disconnected');
    });
    socket.on('say', (msg) => {
        console.log('[Server} Message: ' + msg);
        socket.broadcast.emit('chat message', msg)
        // io.emit('chat message', msg)
    });
});

//Setting the HTTP server to listen on port 3000.
server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
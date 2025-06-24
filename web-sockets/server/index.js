import express from 'express';
import { createServer } from "node:http"; //same as from "http". node: just to improve readability.
import { Server } from "socket.io"

const app = express();
const server = createServer(app);
const io = new Server(server);

//connection event
io.on('connection', (socket) => {
    console.log('Connection established');

    //custom event
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    })

    //disconnect event
    socket.on('disconnect', () => {
        console.log('User disconnected!');
    })
})

server.listen(3000, () => {
    console.log('server started at port 3000');
});
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

const userMap = new Map();

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("set name", (name) => {
    userMap.set(socket.id, name);
  });

  socket.on("chat message", (msg) => {
    const sender = userMap.get(socket.id) || "Unknown";
    io.emit("chat message", { name: sender, text: msg });
  });

  socket.on("disconnect", () => {
    userMap.delete(socket.id);
    console.log("Client disconnected:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});

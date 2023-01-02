const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

var hostId = null;

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // FROM HOST
  socket.on("HOST_JOIN", () => {
    if (hostId === null || hostId === socket.id) {
      hostId = socket.id;
    } else {
      socket.emit("HOST_FORCED_DISCONNECT", socket.id);
    }
  });

  socket.on("HOST_GAME_STATUS", (data) => {
    socket.broadcast.emit("GAME_STATUS", data);
  });

  // FROM PLAYER
  socket.on("PLAYER_JOIN", () => {
    hostId === null
      ? socket.emit("HOST_NONE")
      : console.log("Player joined ", socket.id);
  });

  socket.on("disconnect", function () {
    console.log(`User disconnected: ${socket.id}`);

    if (socket.id === hostId) {
      hostId = null;
    }
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});

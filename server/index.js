const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { Players } = require("./players");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

var hostId = null;
var gameStatus = "splash";
var players = new Players();
var currentQuestion = 0;

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
    gameStatus = data.gameStatus;
    switch (data.gameStatus) {
      case "splash":
        socket.broadcast.emit("GAME_STATUS", data);
        break;
      case "register":
        socket.broadcast.emit("GAME_STATUS", data);
        break;
      case "lobby":
        break;
      case "game":
        socket.broadcast.emit("GAME_STATUS", data);
        break;
      case "result":
        socket.broadcast.emit("GAME_STATUS", data);
        socket.broadcast.emit(
          "RESULTS_TO_ALL",
          JSON.stringify(players.players)
        );
        break;
      default:
    }
  });

  socket.on("HOST_RESTART", () => {
    players = new Players();
    socket.emit("PLAYER_LIST", JSON.stringify(players.players));
    currentQuestion = 0;
  });

  socket.on("HOST_CURRENT_QUESTION", (data) => {
    socket.broadcast.emit("CURRENT_QUESTION", data);
    socket.emit("PLAYER_DATA_UPDATE", JSON.stringify(players.players));
  });

  // FROM PLAYER
  socket.on("PLAYER_JOIN", () => {
    hostId === null
      ? socket.emit("HOST_NONE")
      : console.log("Player joined ", socket.id);
  });

  socket.on("PLAYER_REGISTER", (data) => {
    if (hostId === null) {
      socket.emit("HOST_NONE");
    } else {
      players.addPlayer(hostId, socket.id, data.nickName, 0);
      console.log("playerss", players);

      socket.to(hostId).emit("PLAYER_LIST", JSON.stringify(players.players));
    }
  });

  socket.on("PLAYER_RESTART", () => {
    players.removePlayer(socket.id);
    socket.to(hostId).emit("PLAYER_LIST", JSON.stringify(players.players));
  });

  socket.on("PLAYER_ANSWER", (data) => {
    var player = players.getPlayer(socket.id);
    player.score += data.timer;
    console.log(players);

    socket
      .to(hostId)
      .emit("PLAYER_DATA_UPDATE", JSON.stringify(players.players));
  });

  socket.on("disconnect", function () {
    console.log(`User disconnected: ${socket.id}`);

    if (socket.id === hostId) {
      hostId = null;
      players = new Players();
    } else {
      players.removePlayer(socket.id);
      socket.to(hostId).emit("PLAYER_LIST", JSON.stringify(players.players));
    }
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});

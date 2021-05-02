const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();

app.use(index);

const server = http.createServer(app);

const io = socketIo(server);

let interval;

io.on("connection", (socket) => {
  console.log("New Client Connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket, 1000));
  socket.on("disconnected", () => {
    console.log("client Disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = (socket) => {
  const resonse = new Date();

  socket.emit("FromApi", response);
};

server.listen(port, () => console.log(`Listening on port ${port}`));

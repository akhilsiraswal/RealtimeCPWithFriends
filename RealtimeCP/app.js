const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();

// app.use(cors());
app.use(function (req, res, next) {
  console.log("inside headers");
  console.log(res.header);
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(index);

const server = http.createServer(app);

const io = socketIo(server);

let interval;

io.on("connection", (socket) => {
  console.log("New Client Connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket, 5000));
  socket.on("disconnected", () => {
    console.log("client Disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = (socket) => {
  const response = new Date();
  // console.log(socket);

  socket.emit("FromAPI", response);
};

server.listen(port, () => console.log(`Listening on port ${port}`));

import { App } from "./app"
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(App);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket: any) => {
  socket.on("joinChat", (data: any) => {
    socket.join(data);
  });

  socket.on("sendMessage", (data: any) => {
    socket.to(data.room).emit("receiveMessage", data);
  });
});

//socket server
server.listen(3001, () => {
  console.log("Socket running");
});

//api server
new App().server.listen(3002);
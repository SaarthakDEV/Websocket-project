// socket.ts
import { Server } from "socket.io";
import { generateStockValue } from "./helper/utils.js";

// connection url: ws://localhost:3241
const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);
  });

  setInterval(() => {
    io.emit("new-stock-value", generateStockValue());
  }, 1000);

  return io;
};

export default initializeSocket
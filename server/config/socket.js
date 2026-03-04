import { Server } from "socket.io";
import { generateStockValue } from "./helper/utils.js";

// connection url: ws://localhost:3241
const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
    transports: ["websocket"]
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    })
  });

  setInterval(() => {
    io.emit("new-stock-value", { value: generateStockValue(), timestamp: +new Date() });
  }, 1000);

  return io;
};

export default initializeSocket
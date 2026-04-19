import { Server } from "socket.io";
import { generateStockValue } from "../helper/utils.js";
import pool from "./postgreSql.js";

// connection url: ws://localhost:3241
const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
    transports: ["websocket"]
  });

  io.on("connection", async (socket) => {
    const { userId, type } = socket.handshake.auth;
    if(type === "chats"){
      const result = await pool.query("UPDATE users SET socket_id = array_append(COALESCE(socket_id, ARRAY[]::VARCHAR[]), $1) WHERE id = $2", [socket.id, userId])
      console.log(result)
    }
    
    console.log("Client connected:", socket.id);
    console.log("User Id:", userId);

    socket.on("disconnect",async () => {
      console.log(socket.handshake.auth)
      const { type, userId } = socket.handshake.auth;
      if(type === "chats"){
        const result = await pool.query("UPDATE users SET socket_id = array_remove(COALESCE(socket_id, ARRAY[]::VARCHAR[]), $1) WHERE id = $2", [socket.id, userId])
      }
      console.log("Client disconnected");
    })
  });

  setInterval(() => {
    io.emit("new-stock-value", { value: generateStockValue(), timestamp: +new Date() });
  }, 1000);

  return io;
};

export default initializeSocket
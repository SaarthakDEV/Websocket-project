import { Server } from "socket.io";
import { generateStockValue, getFriendsOnlineSocket, addMessageToDB } from "../helper/utils.js";
import pool from "./postgreSql.js";

// connection url: ws://localhost:3241
const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
    transports: ["websocket"]
  });

  // Clear all stale socket IDs left over from a previous server run
  pool.query("UPDATE users SET socket_id = ARRAY[]::VARCHAR[]").then(() => console.log("Cleared all socket connections for user")).catch(err =>
    console.error("Failed to clear stale socket IDs:", err.message)
  );  

  io.on("connection", async (socket) => {
    const { userId, type } = socket.handshake.auth;

    if (type === "chats" && !userId) {
      socket.disconnect(true);
      return;
    }

    if (type === "chats") {
      try {
        // Join a room named after the user so all their sessions are reachable via one emit
        socket.join(`user:${userId}`);
        await pool.query(
          "UPDATE users SET socket_id = array_append(COALESCE(socket_id, ARRAY[]::VARCHAR[]), $1) WHERE id = $2",
          [socket.id, userId]
        );
        // Notify each online friend's room that this user came online
        const friendIds = await getFriendsOnlineSocket(userId);
        friendIds.forEach(friendId => {
          io.to(`user:${friendId}`).emit("user-online", { userId });
        });
      } catch (err) {
        console.error(`Failed to register socket for user ${userId}:`, err.message);
      }
    }

    if(type === "chats") {
      socket.on("user-message", (data) => {
        const receiver = data.to;
        delete data["to"]
        addMessageToDB(userId, receiver, data)
        
        io.to(`user:${receiver}`).emit("emit-message",{
          text: data.text,
          self: false,
          from: userId
        })
      })

    }

    socket.on("disconnect", async () => {
      if (type === "chats") {
        try {
          await pool.query(
            "UPDATE users SET socket_id = array_remove(COALESCE(socket_id, ARRAY[]::VARCHAR[]), $1) WHERE id = $2",
            [socket.id, userId]
          );
          // Only mark offline if no remaining sessions
          const remaining = await pool.query(
            "SELECT socket_id FROM users WHERE id = $1", [userId]
          );
          const stillOnline = remaining.rows[0]?.socket_id?.length > 0;
          if (!stillOnline) {
            const friendIds = await getFriendsOnlineSocket(userId);
            friendIds.forEach(friendId => {
              io.to(`user:${friendId}`).emit("user-offline", { userId });
            });
          }
        } catch (err) {
          console.error(`Failed to remove socket for user ${userId}:`, err.message);
        }
      }
    });
  });

  setInterval(() => {
    io.emit("new-stock-value", { value: generateStockValue(), timestamp: +new Date() });
  }, 1000);

  return io;
};

export default initializeSocket
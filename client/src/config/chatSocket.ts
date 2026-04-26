import { io, Socket } from "socket.io-client";

let instance: Socket | null = null;

export const initChatSocket = (userId: number) => {
  if (!instance) {
    instance = io("ws://localhost:3241", {
      auth: { userId, type: "chats" },
      transports: ["websocket"],
      autoConnect: false,
    });
  }
  return instance;
};

export const getChatSocket = () => instance;

export default initChatSocket;

import { io } from "socket.io-client";

const chatSocket = (userId: number) => {
  return io("ws://localhost:3241", {
    auth: {
      userId,
      type: "chats",
    },
    transports: ["websocket"],
    autoConnect: false,
  });
};

export default chatSocket;

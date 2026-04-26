import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { getChatSocket } from "../../config/chatSocket";
import { useSelector } from "react-redux";

const Chats = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { id: userId} = useSelector((state: any) => state.auth)
  const [messages, setMessages] = useState<{ text: string; self: boolean }[]>([]);
  const [input, setInput] = useState("");
  const [isOnline, setIsOnline] = useState(false);

  const sendMessage = (newMessage: { text: string, self: boolean}) => {
    const socket = getChatSocket();
    socket?.emit("user-message", {
      ...newMessage,
      to: id
    })
  }

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const messageObj = {
      text: trimmed,
      self: true
    }
    sendMessage(messageObj)
    setMessages((prev) => [...prev, messageObj]);
    setInput("");
  };

  const fetchUserMessages = async () => {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/messages/${userId}/${id}`)
    if(response.status === 200){
      const messageArr = response.data.message.filter(Boolean)
      setMessages(messageArr.map((msg:string) => JSON.parse(msg)))
    }else{

    }
  }

  useEffect(() => {
    if (!id) return;
    axios.get(`${import.meta.env.VITE_BASE_URL}/user/online/${id}`)
      .then(res => setIsOnline(res.data.online))
      .catch(() => setIsOnline(false));
  }, [id]);

  useEffect(() => {
    fetchUserMessages()
    if (!id) return;
    const socket = getChatSocket();
    if (!socket) return;

    socket.on("user-online", (data: { userId: number }) => {
      if (String(data.userId) === String(id)) setIsOnline(true);
    });
    socket.on("user-offline", (data: { userId: number }) => {
      if (String(data.userId) === String(id)) setIsOnline(false);
    });

    socket.on("emit-message", ({ from, ...message }: { text: string, self: boolean, from: number}) => {
      if(from === Number(id)){
        setMessages(prev => [...prev, message])
      }
    })

    return () => {
      socket.off("user-online");
      socket.off("user-offline");
      socket.off("emit-message");
    };
  }, [id]);

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-700 dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Chat {id}</h1>
          <div className="flex items-center gap-1">
            <span className={`w-2 h-2 rounded-full ${isOnline ? "bg-green-500" : "bg-gray-400"}`} />
            <span className="text-xs text-gray-500 dark:text-gray-400">{isOnline ? "Online" : "Offline"}</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
        {messages.length === 0 ? (
          <p className="text-center text-gray-400 dark:text-gray-500 mt-12">No messages yet</p>
        ) : (
          messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.self ? "justify-end" : "justify-start"}`}>
              <span className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${
                msg.self
                  ? "bg-blue-600 text-white rounded-br-sm"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-sm"
              }`}>
                {msg.text}
              </span>
            </div>
          ))
        )}
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="p-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-full transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Chats;
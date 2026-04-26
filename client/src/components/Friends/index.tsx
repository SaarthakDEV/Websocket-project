import { useEffect, useState } from "react";
import { initChatSocket } from "../../config/chatSocket";
import axios from "axios";
import { useSelector } from "react-redux";
import Modal from "../Modal";
import { useNavigate } from "react-router";

const Friends = () => {
  const navigate = useNavigate();
  const userId = useSelector((state: any) => state.auth.id);
  const [userFriends, setUserFriends] = useState<null | any>([]);
  const [socket, setSocket] = useState<any>(null);
  const [open, setOpen] = useState<boolean>(false)
  const [connected, setConnected] = useState<boolean>(false)

  const fetchUserFriends = async () => {
    if(userFriends.length > 0) return;
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/user/friends/${userId}`
    );
    if (response.status === 200) {
      const { friends } = response.data;
      setUserFriends(friends);
    }
  };

  const handleFriendClick = (id: number) => {
    navigate(`/chat/${id}`)
  }

  useEffect(() => {
    const socketInstance = initChatSocket(userId);
    setSocket(socketInstance)
  }, [userId]);

  useEffect(() => {
    if(!socket) return;

    socket.connect();
    fetchUserFriends();

    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));
    socket.on("new-message", () => {});

    return () => {
      // socket.disconnect();
      socket.off("connect");
      socket.off("disconnect");
      socket.off("new-message");
    };
  }, [socket]);
  return (
    <>
    {!connected && socket && (
      <div className="px-4 py-2 text-sm text-yellow-800 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200">
        Reconnecting...
      </div>
    )}
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Friends</h2>
      {userFriends.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
          <p className="text-gray-500 dark:text-gray-400">No friends available</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" onClick={() => setOpen(true)}>
            Add Friends
          </button>
        </div>
      ) : (
        <ul className="space-y-2">
          {userFriends.map((friend: any) => (
            <li key={friend.id} className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-white" onClick={() => handleFriendClick(friend.id)}>
              {friend.name || friend.id}
            </li>
          ))}
        </ul>
      )}
    </div>
    <Modal open={open} onClose={() => setOpen(false)} userId={userId}/>
    </>
  );
};

export default Friends;

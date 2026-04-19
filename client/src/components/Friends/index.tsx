import { useEffect, useState } from "react";
import chatSocket from "../../config/chatSocket";
import axios from "axios";
import { useSelector } from "react-redux";

const Friends = () => {
  const userId = useSelector((state: any) => state.auth.id);
  const [userFriends, setUserFriends] = useState<null | any>([]);
  const [socket, setSocket] = useState<any>(null);


  const fetchUserFriends = async () => {
    if(userFriends.length > 0) return;
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URl}/user/friends/${userId}`,
    );
    if (response.status === 200) {
      const { friends } = response.data;
      setUserFriends(friends);
    }
  };

  useEffect(() => {
    const socketInstance = chatSocket(userId);
    setSocket(socketInstance)
  }, [userId]);

  useEffect(() => {
    if(!socket) return;

    socket.connect();
    fetchUserFriends()

    socket.on("new-message", () => {
      
    });
  }, [socket]);
  return <div>Friends</div>;
};

export default Friends;

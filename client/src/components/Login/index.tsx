import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../slice/authSlice";
import axios from "axios";

const Login = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState<string>("Saarthak");
  const [password, setPassword] = useState<string>("qwerty");
  const token = localStorage.getItem("user_token");

  if (token) dispatch(authActions.setLoggedIn(token));

  const handleLoginClick = async () => {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/login`, {
      name,
      password,
    });
    if(response.status === 200){
      console.log(response)
      const { id, name, socketId, token } = response.data;
      dispatch(authActions.setUser({
        id,
        name,
        socketId: socketId ? socketId : [],
        token
      }))
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("user_token");

    if (token) dispatch(authActions.setLoggedIn(token));
  }, []);
  return (
    <>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ border: "1px solid black" }}
      />
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ border: "1px solid black" }}
      />
      <button onClick={handleLoginClick}>Submit</button>
    </>
  );
};

export default Login;

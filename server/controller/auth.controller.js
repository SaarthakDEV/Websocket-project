import pool from "../config/postgreSql.js";

export const login = async (req, res) => {
  const { name, password } = req.body;
  const returnedUser = await pool.query("SELECT * FROM users WHERE name=$1", [
    name,
  ]);
  console.log(returnedUser.rows);
  if (returnedUser.rowCount === 0) {
    return res.sendStatus(404);
  }
  const user = returnedUser.rows[0];

  if (user.password !== password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  return res.status(200).json({
    id: user.id,
    name,
    socket_id: user.socket_id,
    token: password,
  });
};

export const signup = async (req, res) => {
  const { name, email, password, socketId } = req.body;

  return res.sendStatus(200);
};

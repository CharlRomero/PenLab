import { pool } from "../database.js";
import { hash_password } from "../utils/generate/generate_hash.utils.js";

export const authentication = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    const [result] = await pool.query(
      "SELECT * FROM user WHERE user_name = ?",
      [username]
    );
    if (result.length === 0)
      return res.status(401).json({ message: "Login failed" });
    if (result[0].user_password === hash_password(password))
      return res.json({ message: "Login successful", user: result[0] });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

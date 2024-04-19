import { pool } from "../database.js";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { JWT_SECRET, JWT_COOKIE_EXPIRES, JWT_EXPIRE_TIME } from "../config.js";

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
    if (
      result.length == 0 ||
      !(await bcryptjs.compare(password, result[0].user_password))
    ) {
      return res.status(401).json({ message: "Login failed" });
    }
    const id = result[0].id;
    const token = jsonwebtoken.sign({ id: id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRE_TIME,
    });
    const cookiesOptions = {
      expires: new Date(Date.now() + JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
    };
    res.cookie("jwt", token, cookiesOptions);
    res.json({ message: "Login successful", user: result[0] });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

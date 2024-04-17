import { createPool } from "mysql2/promise";
import { HOST, PORT_DB, USER_DB, PASSWORD_DB, DATABASE } from "./config.js";

export const pool = new createPool({
  host: HOST,
  port: PORT_DB,
  user: USER_DB,
  password: PASSWORD_DB,
  database: DATABASE,
});

async function testConnection() {
  const connection = await pool.getConnection();
  try {
    await connection.connect();
    console.log("Connected to MySQL server");
  } catch (error) {
    console.error("Error connecting to MySQL server:", error);
  } finally {
    connection.release();
  }
}

testConnection();

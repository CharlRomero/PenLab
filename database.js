import { createPool } from "mysql2/promise";
import { HOST, DB_PORT, DB_USER, DB_PASSWORD, DATABASE } from "./config.js";

export const pool = new createPool({
  host: HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
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

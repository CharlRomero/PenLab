import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT;
export const HOST = process.env.HOST;
export const DB_PORT = process.env.DB_PORT;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DATABASE = process.env.DATABASE;
export const COMMAND = process.env.COMMAND;
export const PASSWORD = process.env.PASSWORD;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRE_TIME = process.env.JWT_EXPIRE_TIME;
export const JWT_COOKIE_EXPIRES = process.env.JWT_COOKIE_EXPIRES;

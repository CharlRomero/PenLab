import bcryptjs from "bcryptjs";
import { generate_salt } from "./generate_salt.utils.js";

export const hash_password = async (password) => {
  try {
    const salt = await generate_salt();
    const hash = await bcryptjs.hash(password, salt);
    return {
      salt,
      hash,
    };
  } catch (error) {
    console.error(`Error hashing password: ${error}`);
  }
};

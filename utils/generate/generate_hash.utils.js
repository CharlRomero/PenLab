import { createHmac } from "crypto";
import bcryptjs from "bcryptjs";

export const hash_password_salt = (password, salt) => {
  const hash = createHmac("sha256", salt);
  hash.update(password);
  const value = hash.digest("hex");
  return {
    salt,
    hash: value,
  };
};

export const hash_password = (password) => {
  return bcryptjs.hash(password, 8);
};

import { createHash, createHmac } from "crypto";
import { hash } from "bcryptjs";

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
  return hash(password, 8);
};

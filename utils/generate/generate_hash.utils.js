import { createHash, createHmac } from "crypto";

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
  const hash = createHash("sha256");
  hash.update(password);

  return hash.digest("hex");
};

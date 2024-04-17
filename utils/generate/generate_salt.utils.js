import { randomBytes } from "crypto";

export const generate_salt = () => {
  return randomBytes(16).toString("hex").slice(0, 10);
};

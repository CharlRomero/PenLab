import bcryptjs from "bcryptjs";

export const generate_salt = async () => {
  try {
    return await bcryptjs.genSalt(10);
  } catch (error) {
    console.error(`Error generating salt: ${error}`);
    throw error;
  }
};

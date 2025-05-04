import bcrypt from "bcrypt";

const saltRounds = 10;

// Hash a password for secure storage
export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, saltRounds);
};

// Compare plain text password with stored hash
export const verifyPassword = async (
  password: string,
  hashedPassword: string,
) => {
  return await bcrypt.compare(password, hashedPassword);
};

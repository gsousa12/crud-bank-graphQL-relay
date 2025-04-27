import bcrypt from "bcryptjs";
import { config } from "../../../config";

const SALT_ROUNDS = config.SALT_ROUNDS;

export const PasswordAdapter = {
  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS);
  },
  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  },
};

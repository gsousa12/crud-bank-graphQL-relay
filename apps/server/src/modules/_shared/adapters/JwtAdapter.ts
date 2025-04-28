import jwt from "jsonwebtoken";
import { config } from "../../../config";

export type JwtPayload = {
  userId: string;
};

const JWT_SECRET = config.JWT_SECRET;
const JWT_EXPIRES_IN = config.JWT_EXPIRES_IN;

export const JwtAdapter = {
  sign(payload: JwtPayload): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  },
  verify<T = JwtPayload>(token: string): T {
    return jwt.verify(token, JWT_SECRET) as T;
  },
};

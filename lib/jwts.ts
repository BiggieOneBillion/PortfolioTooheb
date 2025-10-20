
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;
const EXPIRES_IN = process.env.JWT_EXPIRES_IN || "15m";

if (!SECRET) throw new Error("JWT_SECRET not set");

export type JWTPayload = {
  sub: string; // user id
  email?: string;
};

export function signAccessToken(payload: JWTPayload) {
  return jwt.sign(payload, SECRET!, {
    expiresIn: `1day`,
  });
}

export function verifyToken<T = JWTPayload>(token: string): T {
  return jwt.verify(token, SECRET) as T;
}

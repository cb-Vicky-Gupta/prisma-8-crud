import jwt from "jsonwebtoken";

import { env } from "../config/env.ts";

export type AuthUser = {
  id: string;
  email: string;
};

export function signToken(user: AuthUser): string {
  return jwt.sign({ email: user.email }, env.JWT_SECRET, {
    subject: user.id,
    expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
  });
}

export function verifyToken(token: string): AuthUser {
  const payload = jwt.verify(token, env.JWT_SECRET);
  if (typeof payload === "string" || !payload.sub || typeof payload.email !== "string") {
    throw new jwt.JsonWebTokenError("Malformed token payload");
  }
  return { id: payload.sub, email: payload.email };
}

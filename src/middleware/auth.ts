import type { NextFunction, Request, Response } from "express";

import { verifyToken, type AuthUser } from "../lib/auth-token.ts";
import { HttpError } from "../lib/http-error.ts";

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    throw HttpError.unauthorized("Missing bearer token");
  }

  try {
    req.user = verifyToken(header.slice("Bearer ".length));
  } catch {
    throw HttpError.unauthorized("Invalid or expired token");
  }
  next();
}

/** Use in handlers mounted behind `requireAuth`. */
export function currentUser(req: Request): AuthUser {
  if (!req.user) throw HttpError.unauthorized();
  return req.user;
}

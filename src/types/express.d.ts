import type { AuthUser } from "../lib/auth-token.ts";

declare global {
  namespace Express {
    interface Request {
      /** Set by the `requireAuth` middleware. */
      user?: AuthUser;
    }
  }
}

export {};

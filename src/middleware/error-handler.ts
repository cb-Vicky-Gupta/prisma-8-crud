import type { NextFunction, Request, Response } from "express";
import { ZodError, z } from "zod";

import { env } from "../config/env.ts";
import { HttpError } from "../lib/http-error.ts";

export function notFound(req: Request, _res: Response, next: NextFunction) {
  next(HttpError.notFound(`Route ${req.method} ${req.path} not found`));
}

// Express recognises error handlers by their 4-argument signature.
export function errorHandler(error: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (error instanceof ZodError) {
    res.status(400).json({ error: "Validation failed", details: z.flattenError(error) });
    return;
  }

  if (error instanceof HttpError) {
    res.status(error.status).json({ error: error.message, details: error.details });
    return;
  }

  // Malformed JSON body from express.json().
  if (error instanceof SyntaxError && "body" in error) {
    res.status(400).json({ error: "Invalid JSON body" });
    return;
  }

  console.error(error);
  res.status(500).json({
    error: "Internal server error",
    ...(env.NODE_ENV !== "production" && error instanceof Error ? { message: error.message } : {}),
  });
}

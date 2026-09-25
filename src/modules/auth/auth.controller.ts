// Controller: reads the request, calls the service, sends the response.
// Thrown errors (zod or HttpError) become JSON responses in middleware/error-handler.ts.
import type { Request, Response } from "express";

import { signupSchema } from "./auth.schema.ts";
import * as authService from "./auth.service.ts";

export async function signup(req: Request, res: Response) {
  const input = signupSchema.parse(req.body); // invalid body → 400
  const result = await authService.signup(input);

  res.status(201).json(result);
}

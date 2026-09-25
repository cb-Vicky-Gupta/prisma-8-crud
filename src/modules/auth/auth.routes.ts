// Routes: map URLs to controller functions. Mounted at /api/auth in src/routes.ts.
import { Router } from "express";

import * as authController from "./auth.controller.ts";

export const authRouter = Router();

authRouter.post("/signup", authController.signup);

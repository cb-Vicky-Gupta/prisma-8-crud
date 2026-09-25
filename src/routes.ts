import { Router } from "express";

import { authRouter } from "./modules/auth/auth.routes.ts";

export const apiRouter = Router();

// Mount module routers here.
apiRouter.use("/auth", authRouter);

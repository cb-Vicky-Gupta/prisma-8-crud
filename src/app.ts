import cors from "cors";
import express from "express";

import { errorHandler, notFound } from "./middleware/error-handler.ts";
import { apiRouter } from "./routes.ts";

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json({ limit: "1mb" }));

  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.use("/api", apiRouter);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}

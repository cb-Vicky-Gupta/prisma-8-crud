// Must be the first import so `.env` is loaded before anything reads process.env.
import { env } from "./config/env.ts";

import { createApp } from "./app.ts";
import { connectDatabase, db } from "./prisma/db.ts";

await connectDatabase();

const server = createApp().listen(env.PORT, "0.0.0.0", () => {
  console.log(`Server running at http://localhost:${env.PORT}`);
});

function shutdown(signal: string) {
  console.log(`${signal} received, shutting down...`);
  server.close(async () => {
    await db.close();
    process.exit(0);
  });
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

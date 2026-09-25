// Run with `npm run db:seed`.
import "dotenv/config";

import { connectDatabase, db } from "./db.ts";

await connectDatabase();

// Insert seed data here, e.g.:
// await db.orm.public.User.create({ ... });

console.log("Seed complete.");
await db.close();

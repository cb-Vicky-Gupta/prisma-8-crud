// Repository: the only layer that talks to the database for the User table.
// Services call these functions instead of using `db` directly.
import { db } from "../prisma/db.ts";

// Columns that are safe to send to the client (never `passwordHash`).
const publicUserFields = ["id", "email", "name", "createdAt", "updatedAt"] as const;

export type CreateUserData = {
  email: string;
  passwordHash: string;
  name: string;
};

export function findUserByEmail(email: string) {
  return db.orm.public.User.first({ email });
}

export function createUser(data: CreateUserData) {
  return db.orm.public.User.select(...publicUserFields).create(data);
}

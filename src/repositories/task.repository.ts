// Repository: the only layer that talks to the database for the Task table.
import { db } from "../prisma/db.ts";

const taskFields = ["id", "task", "description", "createdAt", "updatedAt"] as const;

export type CreateTaskData = {
  task: string;
  description?: string | null;
};

export function createTask(data: CreateTaskData) {
  return db.orm.public.Task.select(...taskFields).create(data);
}

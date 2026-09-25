import type { Request, Response } from "express";
import { createTask } from "../../repositories/task.repository";
import { taskSchema } from "./task.schema";

export async function create(req: Request, res: Response){
    const data = taskSchema.parse(req.body);
    const result = await createTask(data);

    res.status(201).json(result)
}
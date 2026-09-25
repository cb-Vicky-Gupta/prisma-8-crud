import z from "zod";

export const taskSchema = z.object({
    task : z.string().trim(),
    description : z.string().trim().optional()
})

export type taskInput = z.infer<typeof taskSchema>;
import { Router } from "express";
import * as taskController from './task.contorller.ts'
import { requireAuth } from "../../middleware/auth";
export const taskRouter = Router();

taskRouter.post('/create', requireAuth, taskController.create);
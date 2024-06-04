import { z } from 'zod';
import { Priority } from "../enums/priority";
import { Status } from "../enums/status";

export const createTaskValidator = z.object({
 title: z.string().min(1, 'The task title is mandatory'),
 date: z.string().min(1, 'Task date is mandatory'),
 description: z.string().max(400, "The task description cannot be more than 400 characters"),
 priority: z.enum([Priority.high, Priority.low, Priority.normal]),
 status: z.enum([Status.completed, Status.inProgress, Status.todo]),
});

export const updateTaskValidator = z.object({
 id: z.string().min(1, 'The Task id is mandatory'),
 status: z.enum([Status.completed, Status.inProgress, Status.todo]),
});


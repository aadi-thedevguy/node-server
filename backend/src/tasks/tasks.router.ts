import { Router } from 'express';
import { createValidator, updateValidator } from './tasks.validator';
import { taskController } from './task.controllers';
import { protect } from '../middleware/auth';

/*Fire the router function*/
export const tasksRouter: Router = Router();

// Create a default route.
tasksRouter.get('/tasks', protect, taskController.getAll);

tasksRouter.post(
  '/tasks',
  createValidator,
  protect,
  taskController.create,
);

tasksRouter.put(
  '/tasks',
  updateValidator,
  protect,
  taskController.update,
);

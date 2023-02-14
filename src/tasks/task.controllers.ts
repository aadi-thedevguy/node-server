import { Response } from 'express';
import { validationResult } from 'express-validator';
import { Task } from './task.model';
import { MyRequest, ITask } from '../_interfaces';
import { Status } from '../enums/status';

const create = async (
  req: MyRequest,
  res: Response,
): Promise<Response> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (!req.user)
    return res.status(404).json({ errors: 'Not Authorized' });

  try {
    const task = await Task.create<ITask>({
      user: req.user.id,
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      priority: req.body.priority,
      status: req.body.status,
    });

    return res
      .status(200)
      .json({ task, errors: 'Task Saved Successfully' });
  } catch (error) {
    return res
      .json({ errors: 'Internal Server Error' })
      .status(500);
  }
};

const update = async (
  req: MyRequest,
  res: Response,
): Promise<Response> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const task = await Task.findById(req.body.id);

    if (!task) {
      res.status(400).json({ errors: 'Task Not Found' });
    }

    if (!req.user)
      return res
        .status(401)
        .json({ errors: 'User Not Found' });
        
    // make sure the logged in user matches the Task User
    if (task?.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ errors: 'Task Not Found' });
    }

      let status : Status = req.body.status
      const updatedTask = await Task.findByIdAndUpdate(req.body.id,{
        status
      }, {
        new: true,
      })
    return res.status(200).json(updatedTask)

  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ errors: 'Internal Server Error' })
  }
}

const getAll = async (
  req: MyRequest,
  res: Response,
): Promise<Response> => {
  if (!req.user)
    return res.status(404).json({ errors: 'Not Authorized' })

  try {
    const tasks = await Task.find({ user: req.user.id })
    return res.status(200).json(tasks)
  } catch (error) {
    return res
      .status(500)
      .json({ errors: 'Internal Server Error' });
  }
};

export const taskController = {
  create,
  update,
  getAll,
};

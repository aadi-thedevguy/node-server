import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import {
  createTaskValidator,
  updateTaskValidator,
} from "../../validators/task";
import { protect } from "../../middleware/auth";
import { Task } from "../../models/task.model";
import type { IUser } from "../../models/user.model";

type Variables = {
  user: IUser;
};

const router = new Hono<{ Variables: Variables }>();
// const router = new Hono();

router.get("/", protect, async (c) => {
  const user = c.get("user");
  if (!user) {
    return c.json({ error: "Not Authorized" }, 401);
  }

  try {
    const tasks = await Task.find({ user: user.id });
    return c.json(tasks, 200);
  } catch (error) {
    return c.json({ error: "Internal Server Error" }, 500);
  }
});

router.post(
  "/",
  protect,
  zValidator("form", createTaskValidator),
  async (c) => {
    const body = c.req.valid("form");
    const user = c.get("user");
    if (!user) {
      return c.json({ error: "Not Authorized" }, 401);
    }
    try {
      const task = await Task.create({
        user: user.id,
        title: body.title,
        description: body.description,
        date: body.date,
        priority: body.priority,
        status: body.status,
      });
      return c.json({ task, message: "Task Saved Successfully" }, 201);
    } catch (error) {
      return c.json({ error: "Internal Server Error" }, 500);
    }
  }
);

router.put("/", protect, zValidator("form", updateTaskValidator), async (c) => {
  const body = c.req.valid("form");
  const user = c.get("user");
  if (!user) {
    return c.json({ error: "Not Authorized" }, 401);
  }
  try {
    const task = await Task.findById(body.id);

    if (!task) {
      c.json({ error: "Task Not Found" }, 404);
    }

    if (!user) return;
    c.json({ error: "User Not Found" }, 401);

    // make sure the logged in user matches the Task User
    if (task?.user.toString() !== user.id) {
      return c.json({ error: "Task Not Found" }, 401);
    }

    const updatedTask = await Task.findByIdAndUpdate(
      body.id,
      {
        status: body.status,
      },
      {
        new: true,
      }
    );
    return c.json(updatedTask, 201);
  } catch (error) {
    return c.json({ error: "Internal Server Error" }, 500);
  }
});

export default router;

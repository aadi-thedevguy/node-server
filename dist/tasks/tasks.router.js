"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasksRouter = void 0;
const express_1 = require("express");
const tasks_validator_1 = require("./tasks.validator");
const task_controllers_1 = require("./task.controllers");
const auth_1 = require("../middleware/auth");
/*Fire the router function*/
exports.tasksRouter = (0, express_1.Router)();
// Create a default route.
exports.tasksRouter.get('/tasks', auth_1.protect, task_controllers_1.taskController.getAll);
exports.tasksRouter.post('/tasks', tasks_validator_1.createValidator, auth_1.protect, task_controllers_1.taskController.create);
exports.tasksRouter.put('/tasks', tasks_validator_1.updateValidator, auth_1.protect, task_controllers_1.taskController.update);

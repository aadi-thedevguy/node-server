"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskController = void 0;
const express_validator_1 = require("express-validator");
const task_model_1 = require("./task.model");
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    if (!req.user)
        return res.status(404).json({ errors: 'Not Authorized' });
    try {
        const task = yield task_model_1.Task.create({
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
    }
    catch (error) {
        return res
            .json({ errors: 'Internal Server Error' })
            .status(500);
    }
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const task = yield task_model_1.Task.findById(req.body.id);
        if (!task) {
            res.status(400).json({ errors: 'Task Not Found' });
        }
        if (!req.user)
            return res
                .status(401)
                .json({ errors: 'User Not Found' });
        // make sure the logged in user matches the Task User
        if ((task === null || task === void 0 ? void 0 : task.user.toString()) !== req.user.id) {
            return res
                .status(401)
                .json({ errors: 'Task Not Found' });
        }
        let status = req.body.status;
        const updatedTask = yield task_model_1.Task.findByIdAndUpdate(req.body.id, {
            status
        }, {
            new: true,
        });
        return res.status(200).json(updatedTask);
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ errors: 'Internal Server Error' });
    }
});
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user)
        return res.status(404).json({ errors: 'Not Authorized' });
    try {
        const tasks = yield task_model_1.Task.find({ user: req.user.id });
        return res.status(200).json(tasks);
    }
    catch (error) {
        return res
            .status(500)
            .json({ errors: 'Internal Server Error' });
    }
});
exports.taskController = {
    create,
    update,
    getAll,
};

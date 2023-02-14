"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateValidator = exports.createValidator = void 0;
const express_validator_1 = require("express-validator");
const priority_1 = require("../enums/priority");
const status_1 = require("../enums/status");
exports.createValidator = [
    (0, express_validator_1.body)('title')
        .not()
        .isEmpty()
        .withMessage('The task title is mandatory')
        .trim()
        .isString()
        .withMessage('Title needs to be in a text format'),
    (0, express_validator_1.body)('date')
        .not()
        .isEmpty()
        .withMessage('Task date is mandatory')
        .isString()
        .withMessage('Date needs to be a valid date format'),
    (0, express_validator_1.body)('description')
        .trim()
        .isString()
        .withMessage('Description needs to be in text format'),
    (0, express_validator_1.body)('priority')
        .trim()
        .isIn([priority_1.Priority.high, priority_1.Priority.low, priority_1.Priority.normal])
        .withMessage('Priority can only be normal,high or Low'),
    (0, express_validator_1.body)('status')
        .trim()
        .isIn([status_1.Status.completed, status_1.Status.inProgress, status_1.Status.todo])
        .withMessage('Status can only be in progress, completed or Todo'),
];
exports.updateValidator = [
    (0, express_validator_1.body)('id')
        .not()
        .isEmpty()
        .withMessage('The Task id is mandatory')
        .trim()
        .isString()
        .withMessage('ID must be a string'),
    (0, express_validator_1.body)('status')
        .trim()
        .isIn([status_1.Status.completed, status_1.Status.inProgress, status_1.Status.todo])
        .withMessage('Status can only be in progress, completed or Todo')
];

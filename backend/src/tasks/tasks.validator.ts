import { body } from "express-validator";
import { ValidationChain } from "express-validator/src/chain";
import { Priority } from "../enums/priority";
import { Status } from "../enums/status";

export const createValidator : ValidationChain[] = [
    body('title')
    .not()
    .isEmpty()
    .withMessage('The task title is mandatory')
    .trim()
    .isString()
    .withMessage('Title needs to be in a text format'),
    body('date')
    .not()
    .isEmpty()
    .withMessage('Task date is mandatory')
    .isString()
    .withMessage('Date needs to be a valid date format'),
    body('description')
    .trim()
    .isString()
    .withMessage('Description needs to be in text format'),
    body('priority')
    .trim()
    .isIn([Priority.high, Priority.low, Priority.normal])
    .withMessage('Priority can only be normal,high or Low'),
    body('status')
    .trim()
    .isIn([Status.completed, Status.inProgress, Status.todo])
    .withMessage('Status can only be in progress, completed or Todo'),
]

export const updateValidator : ValidationChain[] = [
    body('id')
    .not()
    .isEmpty()
    .withMessage('The Task id is mandatory')
    .trim()
    .isString()
    .withMessage('ID must be a string'),
    body('status')
    .trim()
    .isIn([Status.completed, Status.inProgress, Status.todo])
    .withMessage('Status can only be in progress, completed or Todo')
] 
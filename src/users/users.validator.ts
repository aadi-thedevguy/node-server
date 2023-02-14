import { body } from "express-validator";
import { ValidationChain } from "express-validator/src/chain";

export const signupValidator : ValidationChain[] = [
    body('name')
    .not()
    .isEmpty()
    .withMessage('The User Name is mandatory')
    .isString()
    .withMessage('Name needs to be in a text format'),
    body('email')
    .isEmail()
    .withMessage('Email Address should be in correct Format'),
    body('password')
    .not()
    .isEmpty()
    .trim()
    .isLength({ min: 7 })
    .withMessage('Enter a Valid Password')
]

export const loginValidator : ValidationChain[] = [
    body('email')
    .isEmail()
    .withMessage('Please Check Your Email Address'),
    body('password')
    .not()
    .isEmpty()
    .isString()
    .trim()
    .isLength({ min: 7 })
    .withMessage('Enter a Valid Password')
] 
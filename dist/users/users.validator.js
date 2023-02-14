"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidator = exports.signupValidator = void 0;
const express_validator_1 = require("express-validator");
exports.signupValidator = [
    (0, express_validator_1.body)('name')
        .not()
        .isEmpty()
        .withMessage('The User Name is mandatory')
        .isString()
        .withMessage('Name needs to be in a text format'),
    (0, express_validator_1.body)('email')
        .isEmail()
        .withMessage('Email Address should be in correct Format'),
    (0, express_validator_1.body)('password')
        .not()
        .isEmpty()
        .trim()
        .isLength({ min: 7 })
        .withMessage('Enter a Valid Password')
];
exports.loginValidator = [
    (0, express_validator_1.body)('email')
        .isEmail()
        .withMessage('Please Check Your Email Address'),
    (0, express_validator_1.body)('password')
        .not()
        .isEmpty()
        .isString()
        .trim()
        .isLength({ min: 7 })
        .withMessage('Enter a Valid Password')
];

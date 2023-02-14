"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_controllers_1 = require("./user.controllers");
const users_validator_1 = require("./users.validator");
/*Fire the router function*/
exports.userRouter = (0, express_1.Router)();
exports.userRouter.post('/signup', users_validator_1.signupValidator, user_controllers_1.userControllers.registerUser);
exports.userRouter.post('/login', users_validator_1.loginValidator, user_controllers_1.userControllers.loginUser);

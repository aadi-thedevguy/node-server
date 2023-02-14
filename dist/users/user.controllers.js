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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userControllers = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const express_validator_1 = require("express-validator");
const user_model_1 = require("./user.model");
// Register new User
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const newUser = req.body;
    const { name, email, password } = newUser;
    try {
        // check if user exists
        const userExits = yield user_model_1.User.findOne({ email });
        if (userExits) {
            return res.status(400).json({ errors: 'User Already Exits' });
        }
        // Hash Password
        const salt = yield bcryptjs_1.default.genSalt(12);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        // Create User
        const user = yield user_model_1.User.create({
            name,
            email,
            password: hashedPassword,
        });
        if (user) {
            return res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        }
        else {
            return res.status(400).json({ errors: 'Invalid Credentials' });
        }
    }
    catch (error) {
        return res.status(500).json({ errors: 'Internal Server Error' });
    }
});
// Description   Authenticate a User
// Route         POST /api/users/login
// Access        Public
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const userObj = req.body;
    const { email, password } = userObj;
    try {
        // check for user email
        const user = yield user_model_1.User.findOne({ email });
        if (user &&
            (yield bcryptjs_1.default.compare(password, user.password))) {
            return res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        }
        else {
            return res.status(400).json({ errors: 'Invalid Credentials' });
        }
    }
    catch (error) {
        return res.status(500).json({ errors: 'Internal Server Error' });
    }
});
// generate JWT
const generateToken = (id) => {
    return (0, jsonwebtoken_1.sign)({ id }, process.env.JWT_SECRET, {
        expiresIn: '24h',
    });
};
exports.userControllers = {
    registerUser,
    loginUser,
};

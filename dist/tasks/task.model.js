"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const mongoose_1 = require("mongoose");
const status_1 = require("../enums/status");
const priority_1 = require("../enums/priority");
// 2. Create a Schema corresponding to the document interface.
const schema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true, default: new Date() },
    status: { type: String, required: true, default: status_1.Status.todo },
    priority: { type: String, required: true, default: priority_1.Priority.normal },
    user: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: 'User'
    },
});
// 3. Create a Model.
exports.Task = (0, mongoose_1.model)('Task', schema);

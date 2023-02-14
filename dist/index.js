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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const tasks_router_1 = require("./tasks/tasks.router");
const users_router_1 = require("./users/users.router");
// Instantiate express app
const app = (0, express_1.default)();
dotenv_1.default.config();
// Parse request Body
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Use CORS install types as well
app.use((0, cors_1.default)());
const port = process.env.PORT || 3200;
mongoose_1.default.set('strictQuery', true);
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(process.env.MONGO_URI || '');
        console.log(`MongoDB Connected http://localhost:${port}`);
    }
    catch (err) {
        console.error('Error during initialization', err);
        process.exit(1);
    }
}));
app.use('/auth', users_router_1.userRouter);
app.use('/api', tasks_router_1.tasksRouter);
// serve frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static(path_1.default.join(__dirname, '../frontend/dist')));
    app.get('*', (req, res) => res.sendFile(path_1.default.resolve(__dirname, '../', 'frontend', 'dist', 'index.html')));
}
else {
    app.get('/', (req, res) => {
        res.send('Please Set To Production');
    });
}

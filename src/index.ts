import express, { Express,Request,Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';

import { tasksRouter } from './tasks/tasks.router';
import { userRouter } from './users/users.router';

// Instantiate express app
const app: Express = express();
dotenv.config();

// Parse request Body
app.use(express.json());
app.use(express.urlencoded({extended : false}))

// Use CORS install types as well
app.use(cors());

const port = process.env.PORT || 3200;

mongoose.set('strictQuery', true);
app.listen(port, async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || '');
        console.log(`MongoDB Connected http://localhost:${port}`);
    }
    catch (err) {
        console.error('Error during initialization', err);
        process.exit(1);
    }
})

app.use('/auth', userRouter);
app.use('/api', tasksRouter);

// serve frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
    app.get('*', (req : Request, res : Response) => res.sendFile(path.resolve(__dirname, '../', 'frontend', 'dist', 'index.html')));
}
else {
    app.get('/', (req : Request, res : Response) => {
        res.send('Please Set To Production');
    });
}

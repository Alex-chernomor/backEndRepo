import express from 'express';
import path from 'node:path';
import cookieParser from 'cookie-parser';
import usersRouter from './router/users.js';
const app = express();

app.use('/photos', express.static(path.resolve('src', 'uploads', 'photos')));

app.use(cookieParser());

app.use('/users', usersRouter);

export default app;

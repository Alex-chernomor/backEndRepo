import express from 'express';
import path from 'node:path';
import cookieParser from 'cookie-parser';
import usersRouter from './router/users.js';

import router from './router/index.js';

const app = express();

app.use('/photos', express.static(path.resolve('src', 'uploads', 'photos')));

app.use(cookieParser());

app.use(express.json());
app.use('/api', router);

app.use('/users', usersRouter);

export default app;

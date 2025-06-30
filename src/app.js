import express from 'express';
import path from 'node:path';
import cookieParser from 'cookie-parser';
import usersRouter from './router/users.js';

import router from './router/index.js';

import pinoHttp from 'pino-http';

const app = express();

app.use('/photos', express.static(path.resolve('src', 'uploads', 'photos')));

app.use(cookieParser());


app.use(express.json());
app.use('/api', router);

app.use(
  pinoHttp({
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
      },
    },
  }),
);


app.use('/users', usersRouter);

export default app;

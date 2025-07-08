import express from 'express';
import cors from 'cors';
import path from 'node:path';
import cookieParser from 'cookie-parser';
import pinoHttp from 'pino-http';

import router from './router/index.js';
import usersRouter from './router/users.js';

const app = express();

// ✅ Всегда первым — JSON-парсер, иначе req.body будет undefined
app.use(express.json());

// ✅ Затем можно ставить cookie-parser
app.use(cookieParser());

// ✅ Потом логгер
app.use(
  pinoHttp({
    transport: {
      target: 'pino-pretty',
      options: { colorize: true },
    },
  }),
);

// ✅ CORS после базовых middleware (можно и раньше, но лучше так)
app.use(
  cors({

    origin: [
      'http://localhost:5173',
      'https://front-end-repo-nu.vercel.app',
      'https://front-end-repo-eosin.vercel.app',
    ],

    credentials: true,
  }),
);

// ✅ Статичные файлы
app.use('/photos', express.static(path.resolve('src', 'uploads', 'photos')));

// ✅ Роуты
app.use('/api', router);
app.use('/users', usersRouter);

export default app;

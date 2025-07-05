import express from 'express';
import cors from 'cors';
import path from 'node:path';
import cookieParser from 'cookie-parser';
import pinoHttp from 'pino-http';

import router from './router/index.js';
import usersRouter from './router/users.js';

const app = express();

app.use(
  cors({
    origin: ['http://localhost:5173', 'https://front-end-repo-nu.vercel.app/'],
    credentials: true,
  }),
);

app.use(cookieParser());

app.use(express.json());

app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Валидация
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Пример создания пользователя
    const newUser = await User.create({ name, email, password });

    res.status(201).json({ message: 'User created', user: newUser });
  } catch (error) {
    console.error('❌ Registration error:', error); // <== Вот это ключ
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.use(
  pinoHttp({
    transport: {
      target: 'pino-pretty',
      options: { colorize: true },
    },
  }),
);

app.use('/photos', express.static(path.resolve('src', 'uploads', 'photos')));

app.use('/api', router);
app.use('/users', usersRouter);

export default app;

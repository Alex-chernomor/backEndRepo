import express from 'express';
import { RecipesCollection } from './models/recipe.js';
import cookieParser from 'cookie-parser';
import usersRouter from './router/users.js';
const app = express();

app.use(cookieParser());

app.use('/api/users', usersRouter);

export default app;

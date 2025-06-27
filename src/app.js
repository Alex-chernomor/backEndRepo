import express from 'express';
import { RecipesCollection } from './models/recipe.js';
import cookieParser from 'cookie-parser';
const app = express();

app.use(cookieParser());

export default app;

import express from 'express';
import { RecipesCollection } from './models/recipe.js';
import router from './router/recipes.js';

const app = express();

app.use(router);
export default app;

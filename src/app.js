import express from 'express';
import { RecipesCollection } from './models/recipe.js';

const app = express();

app.get('/api/recipes/:id', async (req, res) => {});
export default app;

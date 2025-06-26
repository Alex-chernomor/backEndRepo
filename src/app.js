import express from 'express';

import { Recipe } from './models/recipe.js';

const app = express();

app.get('/api/recipes', async (req, res) => {
  const recipes = await Recipe.find();

  res.json({ data: recipes });
});

app.get('/api/recipes/:id', async (req, res) => {
  const recipeId = req.params.id;
  const recipe = await Recipe.findById(recipeId);

  if (recipe === null) {
    return res.status(404).send({message:'Recipe not found'})
  }

  res.json({data: recipe})
});
export default app;

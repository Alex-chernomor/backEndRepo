import { RecipesCollection } from '../models/recipe.js';

export const getRecipesOwn = async ({ owner }) => {
  const recipes = await RecipesCollection.find({ owner });
  return recipes;
};

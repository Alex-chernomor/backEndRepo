import { IngredientsCollection } from '../models/ingredient.js';

export const getAllIngredients = async () => {
  const ingredients = await IngredientsCollection.find();
  return ingredients;
};

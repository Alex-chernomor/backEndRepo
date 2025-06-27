import { getAllIngredients } from '../services/ingredients.js';

export const getAllIngredientsController = async (req, resp) => {
  const ingredients = await getAllIngredients();

  resp.json({
    status: 200,
    message: 'Successfully found ingredients!',
    data: ingredients,
  });
};

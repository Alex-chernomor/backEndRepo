import createHttpError from 'http-errors';
import { getRecipesOwn } from '../services/recipes.js';

export const getOwnRecipesController = async (req, res, next) => {
  const recipes = await getRecipesOwn({
    owner: req.user._id,
  });

  if (!recipes) {
    throw createHttpError(404, 'Own recipes not found');
  }

  res.json({
    status: 200,
    message: 'Successfully found own recipes!',
    data: recipes,
  });
};

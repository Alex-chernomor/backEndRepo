import createHttpError from 'http-errors';
import { Recipe } from '../models/recipe.js';

export const checkRecipeOwner = async (req, res, next) => {
  const { recipeId } = req.params;
  const userId = req.user._id;

  const recipe = await Recipe.findById(recipeId);
  if (!recipe) {
    throw createHttpError(404, 'Recipe not found');
  }

  if (!recipe.owner.equals(userId)) {
    throw createHttpError(
      403,
      'Access denied. You are not the owner of this recipe',
    );
  }
  next();
};

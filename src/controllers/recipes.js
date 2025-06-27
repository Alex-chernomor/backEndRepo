import createHttpError from 'http-errors';
import {
  addFavorite,
  deleteFavorite,
  getAllFavorites,
  getAllRecipes,
} from '../services/recipes.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';

export const getAllRecipesController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { category, ingredientId } = await parseFilterParams(req.query);
  const query = req.query.query;

  const data = await getAllRecipes({
    page,
    perPage,
    category,
    ingredientId,
    query,
  });

  res.status(200).json({
    status: 200,
    data,
  });
};

export const addFavoriteController = async (req, res) => {
  const favorite = await addFavorite(req.user.id, req.params.recipeId);

  res.status(201).json({
    status: 201,
    message: `Successfully added to favorite recipes!`,
    data: favorite,
  });
};

export const deleteFavoriteController = async (req, res, next) => {
  const { recipeId } = req.params;

  const favourite = await deleteFavorite(req.user.id, recipeId);

  if (!favourite) {
    next(createHttpError(404, 'Recipe not found'));
    return;
  }

  res.status(204).send();
};

export const getAllFavoritesController = async (req, res) => {
  const favorites = await getAllFavorites(req.user.id);

  res.status(200).json({
    status: 200,
    message: 'Successfully found favorite recipes!',
    data: favorites,
  });
};

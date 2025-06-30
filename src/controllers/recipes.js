import * as fs from 'node:fs/promises';
import path from 'node:path';

import createHttpError from 'http-errors';
import {
  addFavorite,
  deleteFavorite,
  getAllFavorites,
  getAllRecipes,
  getRecipeById,
  getRecipesOwn,
  createRecipe,
} from '../services/recipes.js';

import { getEnvVar } from '../utils/getEnvVar.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { uploadToCloudinary } from '../utils/uploadToCloudinary.js';

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

export const createRecipeController = async (req, res) => {
  let thumb = null;

  const uploadToCloudinarySwitcher =
    getEnvVar('UPLOAD_TO_CLOUDINARY') === 'true';

  if (uploadToCloudinarySwitcher) {
    const result = await uploadToCloudinary(req.file.path);
    await fs.unlink(req.file.path);

    thumb = result.secure_url;
  } else {
    await fs.rename(
      req.file.path,
      path.resolve('src', 'uploads', 'photos', req.file.filename),
    );

    thumb = `${getEnvVar('SERVER_ADRESS')}/photos/${req.file.filename}`;
  }

  let ingredients = req.body.ingredients;
  // Розпарсимо ingredients, якщо це рядок (а не вже масив)
  if (typeof ingredients === 'string') {
    try {
      ingredients = JSON.parse(ingredients);
    } catch (error) {
      return res.status(400).json({
        message: 'Invalid JSON format in ingredients field',
      });
    }
  }

  const recipeData = {
    ...req.body,
    ingredients,
    owner: req.user._id,
    thumb,
  };

  const recipe = await createRecipe(recipeData);

  res.status(201).json({
    status: 201,
    message: 'Recipe created successfully',
    data: recipe,
  });
};

export const getRecipeByIdController = async (req, resp) => {
  const { recipeId } = req.params;
  const recipe = await getRecipeById(recipeId);

  resp.status(200).json({
    status: 200,
    message: `Successfully found recipe by id!`,
    data: recipe,
  });
};

export const getOwnRecipesController = async (req, res, next) => {
  const own = await getRecipesOwn(req.user.id);

  res.json({
    status: 200,
    message: 'Successfully found own recipes!',
    data: own,
  });
};

export const addFavoriteController = async (req, res) => {
  const favorite = await addFavorite(req.user._id, req.params.recipeId);

  res.status(201).json({
    status: 201,
    message: `Successfully added to favorite recipes!`,
    data: favorite,
  });
};

export const deleteFavoriteController = async (req, res, next) => {
  const { recipeId } = req.params;

  const favourite = await deleteFavorite(req.user._id, recipeId);

  if (!favourite) {
    next(createHttpError(404, 'Recipe not found'));
    return;
  }

  res.status(200).json({
    status: 200,
    message: `Recipe with id ${recipeId} was successfully removed from favorites`,
  });
};

export const getAllFavoritesController = async (req, res) => {
  const favorites = await getAllFavorites(req.user._id);

  res.status(200).json({
    status: 200,
    message: 'Successfully found favorite recipes!',
    data: favorites,
  });
};

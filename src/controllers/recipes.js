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

import { User } from '../models/user.js';
import { Category } from '../models/category.js';
import { getEnvVar } from '../utils/getEnvVar.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { uploadToCloudinary } from '../utils/uploadToCloudinary.js';
import { createRecipeSchema } from '../validation/recipe.js';
import mongoose from 'mongoose';

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

  if (req.file) {
    if (uploadToCloudinarySwitcher) {
      const result = await uploadToCloudinary(req.file?.path);
      await fs.unlink(req.file.path);
      thumb = result.secure_url;
    } else {
      await fs.rename(
        req.file.path,
        path.resolve('src', 'uploads', 'photos', req.file.filename),
      );
      thumb = `${getEnvVar('SERVER_ADRESS')}/photos/${req.file.filename}`;
    }
  }

  let ingredients = req.body.ingredients;
  if (typeof ingredients === 'string') {
    try {
      ingredients = JSON.parse(ingredients);
    } catch (error) {
      return res.status(400).json({
        message: 'Invalid JSON format in ingredients field',
      });
    }
  }

  // Формуємо об'єкт для валідації (з уже розпарсеними ingredients)
  const dataToValidate = {
    ...req.body,
    ingredients,
    thumb, // якщо хочеш валідовувати, можна і це додати
    owner: req.user._id.toString(),
  };

  // Валідовуємо через Joi
  const { error } = createRecipeSchema.validate(dataToValidate, {
    abortEarly: false,
  });
  if (error) {
    // Повертаємо всі помилки в одному масиві
    return res
      .status(400)
      .json({ message: error.details.map((d) => d.message) });
  }

  // Перевірка валідності categoryId в MongoDB
  if (!mongoose.Types.ObjectId.isValid(dataToValidate.category)) {
    return res.status(400).json({ message: 'Invalid category ID format' });
  }
  console.log('categoryExists');
  const categoryExists = await Category.findById(dataToValidate.category);
  console.log(categoryExists);
  if (!categoryExists) {
    return res.status(400).json({ message: 'Category not found' });
  }

  const recipeData = {
    ...dataToValidate,
  };

  const recipe = await createRecipe(recipeData);

  await User.findByIdAndUpdate(req.user._id, { $push: { own: recipe._id } });

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
  const { page, perPage } = parsePaginationParams(req.query);

  const data = await getRecipesOwn({
    page,
    perPage,
    owner: req.user._id,
  });

  res.json({
    status: 200,
    message: 'Successfully found own recipes!',
    data,
  });
};

export const addFavoriteController = async (req, res) => {
  const recipeId = new mongoose.Types.ObjectId(req.params.recipeId);
  const favorite = await addFavorite(req.user._id, recipeId);

  res.status(201).json({
    status: 201,
    message: `Successfully added to favorite recipes!`,
    data: favorite,
  });
};

export const deleteFavoriteController = async (req, res, next) => {
  const recipeId = new mongoose.Types.ObjectId(req.params.recipeId);

  const favourite = await deleteFavorite(req.user._id, recipeId);

  if (!favourite) {
    next(createHttpError(404, 'Recipe not found'));
    return;
  }

  res.status(200).json({
    status: 200,
    message: `Recipe with id ${recipeId} was successfully removed from favorites`,
    data: favourite,
  });
};

export const getAllFavoritesController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const favorites = await getAllFavorites(req.user._id, page, perPage);

  res.status(200).json({
    status: 200,
    message: 'Successfully found favorite recipes!',
    data: favorites,
  });
};

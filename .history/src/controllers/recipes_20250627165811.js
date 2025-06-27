import { createRecipe, getAllRecipes } from '../services/recipes.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';

export const getAllRecipesController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { category, ingredientId } = parseFilterParams(req.query);
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
  const { category, ingredientId } = parseFilterParams(req.body);

  const data = await createRecipe({
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

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
  console.log(req.body);
  const data = await createRecipe({
    ...req.body,
    time: new Date(),
    owner: ObjectId('4ecc05e55dd98a436ddcc47c'),,
  });

  res.status(200).json({
    status: 200,
    message: 'Recipe was created successfully',
    data,
  });
};

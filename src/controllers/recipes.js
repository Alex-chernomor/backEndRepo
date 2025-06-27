import { getAllRecipes, getRecipeById } from '../services/recipes.js';
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

export const getRecipeByIdController = async (req, res) => {
  const recipeId = req.params.id;
  const recipe = await getRecipeById(recipeId);

  // на мою думку краще обробляти помилки зі допомогою бібліотеки http-errors тим паче якщо використовується error handler
  if (recipe === null) {
    return res.status(404).send({ message: 'Recipe not found' });
  }

  res.json({ data: recipe });
};

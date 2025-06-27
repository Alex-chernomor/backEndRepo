import { getAllRecipes } from '../services/recipes';
import { parseFilterParams } from '../utils/parseFilterParams';
import { parsePaginationParams } from '../utils/parsePaginationParams';

export const getAllRecipesController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { category, ingredient } = parseFilterParams(req.query);
  const query = req.query.qury;

  const data = await getAllRecipes({
    page,
    perPage,
    category,
    ingredient,
    query,
  });

  res.status(200).json({
    status: 200,
    data,
  });
};

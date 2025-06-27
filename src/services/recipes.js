import { RecipesCollection } from '../models/recipe.js';

export const getAllRecipes = async ({
  page,
  perPage,
  category,
  ingredientId,
  query,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const recipesQuery = RecipesCollection.find();

  if (category) {
    recipesQuery.where('category').equals(category);
  }
  if (ingredient) {
    recipesQuery.where('ingredients.id').equals(ingredientId);
  }
  if (query) {
    recipesQuery.where('title').regex(new RegExp(query, 'i'));
  }

  const [recipesCount, recipes] = await Promise.all([
    RecipesCollection.find().merge(recipesQuery).countDocuments(),
    recipesQuery.skip(skip).limit(limit).exec(),
  ]);

  const totalPages = Math.ceil(count / perPage);

  return { data: recipes, total: count, page, perPage, totalPages };
};

export const getRecipeById = async (id) => {
  return await RecipesCollection.findById(recipeId);
};

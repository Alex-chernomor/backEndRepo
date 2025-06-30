import { User } from '../models/user.js';
import { Recipe } from '../models/recipe.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
export const getAllRecipes = async ({
  page,
  perPage,
  category,
  ingredientId,
  query,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const recipesQuery = Recipe.find();

  if (category) {
    recipesQuery.where('category').equals(category);
  }
  if (ingredientId) {
    recipesQuery.where('ingredients.id').equals(ingredientId);
  }
  if (query) {
    recipesQuery.where('title').regex(new RegExp(query, 'i'));
  }

  const [recipesCount, recipes] = await Promise.all([
    Recipe.find().merge(recipesQuery).countDocuments(),
    recipesQuery.skip(skip).limit(limit).exec(),
  ]);

  const totalPages = Math.ceil(recipesCount / perPage);

  return { data: recipes, total: recipesCount, page, perPage, totalPages };
};

export function createRecipe(payload) {
  return Recipe.create(payload);
}

export const getRecipeById = async (recipeId) => {
  return await Recipe.findOne({ _id: recipeId });
};

export const getRecipesOwn = async (userId) => {

  const page = 1;
  const perPage = 12;
  const sortBy = 'createdAt';
  const sortOrder = -1;

  const limit = perPage;
  const skip = (page - 1) * perPage;

  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  const [recipesCount, recipes] = await Promise.all([
    Recipe.countDocuments({ owner: userId }),
    Recipe.find({ owner: userId })
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder }),
  ]);

  const paginationData = calculatePaginationData(recipesCount, perPage, page);

  return {
    data: recipes,
    ...paginationData,
  };

};

export const addFavorite = async (userId, recipeId) => {
  return await User.findByIdAndUpdate(
    userId,
    {
      $addToSet: { favorites: recipeId },
    },
    { new: true },
  );
};

export const deleteFavorite = async (userId, recipeId) => {
  return await User.findByIdAndUpdate(
    userId,
    {
      $pull: { favorites: recipeId },
    },
    { new: true },
  );
};

export const getAllFavorites = async (userId) => {
  const page = 1;
  const perPage = 12;
  const sortBy = 'createdAt';
  const sortOrder = -1;

  const limit = perPage;
  const skip = (page - 1) * perPage;

  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  const favoriteIds = user.favorites;
  const favoriteRecipes = { _id: { $in: favoriteIds } };

  const [recipesCount, recipes] = await Promise.all([
    Recipe.countDocuments(favoriteRecipes),
    Recipe.find(favoriteRecipes)
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder }),
  ]);

  const paginationData = calculatePaginationData(recipesCount, perPage, page);

  return {
    data: recipes,
    ...paginationData,
  };
};

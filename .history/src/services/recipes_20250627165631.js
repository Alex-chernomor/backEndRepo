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
  console.log(ingredientId);

  const recipesQuery = RecipesCollection.find();

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
    RecipesCollection.find().merge(recipesQuery).countDocuments(),
    recipesQuery.skip(skip).limit(limit).exec(),
  ]);

  const totalPages = Math.ceil(recipesCount / perPage);

  return { data: recipes, total: recipesCount, page, perPage, totalPages };
};

export const createRecipe = async ({
  title,
  category,
  owner,
  area,
  instructions,
  description,
  thumb,
  ingredients,
}) => {
  const recipe = RecipesCollection.create();
  const data = recipe.save();

  res.status(201).json({
    status: 201,
    data: { id: data.id },
  });
};

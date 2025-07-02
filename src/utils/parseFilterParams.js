// import { getAllIngredients } from '../services/ingredients.js';

const parseCategory = (category) => {
  if (typeof category !== 'string') return;

  const isCategory = [
    'Seafood',
    'Lamb',
    'Starter',
    'Chicken',
    'Beef',
    'Dessert',
    'Vegan',
    'Pork',
    'Vegetarian',
    'Miscellaneous',
    'Pasta',
    'Breakfast',
    'Side',
    'Goat',
    'Soup',
  ].includes(category);
  if (isCategory) return category;
};

const parseIngredientId = async (ingredientId) => {
  if (typeof ingredientId !== 'string') return;

  const allIngredients = await getAllIngredients();
  const ingredientsIds = allIngredients.map((ingredient) => ingredient._id);

  const isIngredientId = ingredientsIds.includes(ingredientId);
  if (isIngredientId) return ingredientId;
};

export const parseFilterParams = async ({ category, ingredientId }) => {
  const parsedCategory = parseCategory(category);
  const parsedIngredientId = await parseIngredientId(ingredientId);

  return {
    category: parsedCategory,
    ingredientId: parsedIngredientId,
  };
};

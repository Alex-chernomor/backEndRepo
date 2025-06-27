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

const parseIngredientId = (ingredientId) => {
  if (typeof category !== 'string') return;

  const allIngredientsIds = [];

  const isIngredientId = allIngredientsIds.includes(ingredientId);
  if (isIngredientId) return ingredientId;
};

export const parseFilterParams = ({ category, ingredientId }) => {
  const parsedCategory = parseCategory(category);
  const parsedIngredientId = parseIngredientId(ingredientId);

  return {
    category: parsedCategory,
    ingredientId: parsedIngredientId,
  };
};

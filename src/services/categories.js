// import { Category } from '../db/models/category.js';

import { Category } from '../models/category.js';

export const getAllCategories = async () => {
  const categories = await Category.find();
  return categories;
};

export const createCategory = async (data) => {
  const category = await Category.create(data);
  return category;
};

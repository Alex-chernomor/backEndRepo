import { getAllCategories, createCategory } from '../services/categories.js';

export const getCategoriesController = async (req, res, next) => {
  try {
    const categories = await getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

export const createCategoryController = async (req, res, next) => {
  try {
    const category = await createCategory(req.body);
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

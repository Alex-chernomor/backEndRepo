import { getAllCategories, createCategory } from '../services/categories.js';

// export const getCategoriesController = async (req, res, next) => {
//   try {
//     const categories = await getAllCategories();
//     res.status(200).json(categories);
//   } catch (error) {
//     next(error);
//   }
// };

// export const createCategoryController = async (req, res, next) => {
//   try {
//     const category = await createCategory(req.body);
//     res.status(201).json(category);
//   } catch (error) {
//     next(error);
//   }
// };
export const getCategoriesController = async (req, res, next) => {
  try {
    const categories = await getAllCategories();
    res.status(200).json({
      status: 200,
      message: 'Categories fetched successfully',
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

export const createCategoryController = async (req, res, next) => {
  try {
    const category = await createCategory(req.body);
    res.status(201).json({
      status: 201,
      message: 'Category created successfully',
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

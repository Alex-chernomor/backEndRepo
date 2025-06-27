import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getCategoriesController,
  createCategoryController,
} from '../controllers/categories.js';

const router = Router();

router.get('/', ctrlWrapper(getCategoriesController));

router.post('/', ctrlWrapper(createCategoryController));

export default router;

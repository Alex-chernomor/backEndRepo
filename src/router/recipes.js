import express from 'express';
import { isValidId } from '../middlewares/validateObjectId.js';
import { auth } from '../middlewares/auth.js';

import {
  addFavoriteController,
  deleteFavoriteController,
  getAllFavoritesController,
  getAllRecipesController,
} from '../controllers/recipes.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();
const jsonParser = express.json();

router.get('/', ctrlWrapper(getAllRecipesController));

// router.use(auth);

router.post(
  '/favorite/:recipeId',
  isValidId,
  jsonParser,
  auth,
  ctrlWrapper(addFavoriteController),
);

router.delete(
  '/favorite/:recipeId',
  isValidId,
  jsonParser,
  auth,
  ctrlWrapper(deleteFavoriteController),
);

router.get(
  '/favorite',
  // isValidId,
  jsonParser,
  auth,
  ctrlWrapper(getAllFavoritesController),
);
export default router;

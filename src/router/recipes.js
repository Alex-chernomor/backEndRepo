import { Router } from 'express';
import {
  addFavoriteController,
  deleteFavoriteController,
  getAllFavoritesController,
  getAllRecipesController,
} from '../controllers/recipes.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/', ctrlWrapper(getAllRecipesController));

router.use(auth);

router.post(
  '/favorite/:recipeId',
  isValidId,
  jsonParser,
  ctrlWrapper(addFavoriteController),
);

router.delete(
  '/favorite/:recipeId',
  isValidId,
  jsonParser,
  ctrlWrapper(deleteFavoriteController),
);

router.get(
  '/favorite',
  isValidId,
  jsonParser,
  ctrlWrapper(getAllFavoritesController),
);
export default router;

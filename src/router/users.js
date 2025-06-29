import { Router } from 'express';
import express from 'express';
import { currentUserController } from '../controllers/users.js';
import { auth } from '../middlewares/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import {
  addFavoriteController,
  deleteFavoriteController,
  getAllFavoritesController,
} from '../controllers/recipes.js';

const router = Router();

router.get('/current', auth, currentUserController);

router.post(
  '/favorites/:recipeId',
  auth,
  isValidId,
  ctrlWrapper(addFavoriteController),
);

router.delete(
  '/favorites/:recipeId',
  auth,
  isValidId,
  ctrlWrapper(deleteFavoriteController),
);

router.get('/favorites', auth, ctrlWrapper(getAllFavoritesController));

export default router;

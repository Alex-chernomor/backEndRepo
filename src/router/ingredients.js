import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getAllIngredientsController } from '../controllers/ingredients.js';

const router = express.Router();

router.get('/', ctrlWrapper(getAllIngredientsController));

export default router;

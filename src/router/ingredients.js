import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getAllIngredientsController } from '../controllers/ingredients.js';

const router = Router();

router.get('/', ctrlWrapper(getAllIngredientsController));

export default router;

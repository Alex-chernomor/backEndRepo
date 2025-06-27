import { loginController } from '../controllers/auth.js';
import { loginSchema } from '../validation/auth.js';

router.post(
  '/login',
  jsonParser,
  validateBody(loginSchema),
  ctrlWrapper(loginController),
);

import { Router } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/validator';
import { AuthController } from '../controllers/auth';

const router = Router();
const authController = new AuthController();

router.post(
  '/login',
  [
    body('username').trim().isLength({ min: 3 }),
    body('password').isLength({ min: 8 }),
    validateRequest
  ],
  authController.login
);

router.post('/logout', authController.logout);
router.get('/me', authController.getCurrentUser);

export { router as authRouter };
import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';
import { createUserSchema, loginUserSchema, updateUserSchema } from '../utils/schemas/user.schema';

const router = Router();
const userController = new UserController();

//rotas públicas - registro e login
router.post('/auth/register', validate(createUserSchema), userController.register.bind(userController));
router.post('/auth/login', validate(loginUserSchema), userController.login.bind(userController));

//rota protegida - refresh token
router.post('/auth/refresh', authenticate, userController.refreshToken.bind(userController));

//rotas protegidas - perfil do usuário
router.get('/profile', authenticate, userController.profile.bind(userController));
router.put('/profile', authenticate, validate(updateUserSchema), userController.updateProfile.bind(userController));
router.delete('/profile', authenticate, userController.deleteAccount.bind(userController));

export default router;

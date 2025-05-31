import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';
import { createUserSchema, loginUserSchema, updateUserSchema } from '../utils/schemas/user.schema';

const router = Router();
const userController = new UserController();

//rotas públicas - registro e login
router.post('/users', validate(createUserSchema), userController.register.bind(userController));
router.post('/users/login', validate(loginUserSchema), userController.login.bind(userController));

//rota protegida - refresh token
router.post('/users/refresh', authenticate, userController.refreshToken.bind(userController));

//rotas protegidas - não implementadas no front end mas é legal ter elas
router.get('/users/me', authenticate, userController.profile.bind(userController));
router.put('/users/me', authenticate, validate(updateUserSchema), userController.updateProfile.bind(userController));
router.delete('/users/me', authenticate, userController.deleteAccount.bind(userController));

export default router;

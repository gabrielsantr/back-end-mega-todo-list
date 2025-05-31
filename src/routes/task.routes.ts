import { Router } from 'express';
import { TaskController } from '../controllers/task.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';
import { createTaskSchema, updateTaskSchema } from '../utils/schemas/task.schema';

const router = Router();
const taskController = new TaskController();

// Todas as rotas de tasks requerem autenticação
router.post('/tasks', authenticate, validate(createTaskSchema), taskController.create.bind(taskController));

// Buscar task pelo id dela
router.get('/tasks/:id', authenticate, taskController.findById.bind(taskController));

// Buscar todas as tasks do usuário
router.get('/tasks', authenticate, taskController.list.bind(taskController));

// Atualizar task pelo id dela
router.put('/tasks/:id', authenticate, validate(updateTaskSchema), taskController.update.bind(taskController));

// Deletar todas as tasks completadas do usuário
router.delete('/tasks/completed', authenticate, taskController.deleteCompleted.bind(taskController));

// Deletar task pelo id dela
router.delete('/tasks/:id', authenticate, taskController.delete.bind(taskController));

export default router;

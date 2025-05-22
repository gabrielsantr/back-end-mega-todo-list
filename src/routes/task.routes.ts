import { Router } from 'express';
import { TaskController } from '../controllers/task.controller';
import { validate } from '../middlewares/validation.middleware';
import { createTaskSchema, updateTaskSchema } from '../utils/schemas/task.schema';

const router = Router();
const taskController = new TaskController();

//TODO: Adicionar o middleware de autenticação

router.post('/tasks', validate(createTaskSchema), taskController.create.bind(taskController));

router.get('/tasks/:id', taskController.findById.bind(taskController));

router.get('/tasks', taskController.list.bind(taskController));

router.put('/tasks/:id', validate(updateTaskSchema), taskController.update.bind(taskController));

router.delete('/tasks/:id', taskController.delete.bind(taskController));

export default router;

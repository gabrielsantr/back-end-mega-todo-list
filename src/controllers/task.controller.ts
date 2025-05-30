import type { Request, Response } from 'express';
import { TaskRepository } from '../repositories/task.repository';
import { handleError, NotFoundError, AuthorizationError, ValidationError } from '../utils/handler/error.handler';

export class TaskController {
	private taskRepository: TaskRepository;

	constructor() {
		this.taskRepository = new TaskRepository();
	}

	async create(req: Request, res: Response) {
		try {
			// userId vem do middleware de autenticação
			const userId = req.user.id;
			const task = await this.taskRepository.create({
				...req.body,
				userId,
			});

			res.status(201).json({
				message: 'Task criada com sucesso',
				task,
			});
		} catch (error: unknown) {
			handleError(error, res);
		}
	}

	async findById(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const userId = req.user.id;

			const task = await this.taskRepository.findById(id);

			if (!task) {
				throw new NotFoundError('Task não encontrada');
			}

			// Verificar se a task pertence ao usuário
			if (task.userId !== userId) {
				throw new AuthorizationError('Acesso negado a esta task');
			}

			res.json(task);
		} catch (error: unknown) {
			handleError(error, res);
		}
	}

	async list(req: Request, res: Response) {
		try {
			// userId vem do middleware de autenticação
			const userId = req.user.id;
			const tasks = await this.taskRepository.findByUserId(userId);
			res.json(tasks);
		} catch (error: unknown) {
			handleError(error, res);
		}
	}

	async update(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const userId = req.user.id;
			const updateData = req.body;

			// Verificar se a task existe e pertence ao usuário
			const existingTask = await this.taskRepository.findById(id);
			if (!existingTask) {
				throw new NotFoundError('Task não encontrada');
			}

			if (existingTask.userId !== userId) {
				throw new AuthorizationError('Acesso negado a esta task');
			}

			const task = await this.taskRepository.update(id, updateData);

			res.json({
				message: 'Task atualizada com sucesso',
				task,
			});
		} catch (error: unknown) {
			handleError(error, res);
		}
	}

	async delete(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const userId = req.user.id;

			// Verificar se a task existe e pertence ao usuário
			const existingTask = await this.taskRepository.findById(id);
			if (!existingTask) {
				throw new NotFoundError('Task não encontrada');
			}

			if (existingTask.userId !== userId) {
				throw new AuthorizationError('Acesso negado a esta task');
			}

			await this.taskRepository.delete(id);
			res.status(204).send();
		} catch (error: unknown) {
			handleError(error, res);
		}
	}

	async deleteMany(req: Request, res: Response) {
		try {
			const { ids } = req.body;
			await this.taskRepository.deleteMany(ids);
			res.status(204).send();
		} catch (error: unknown) {
			handleError(error, res);
		}
	}

	async deleteCompleted(req: Request, res: Response) {
		try {
			const { completed } = req.query;
			const userId = req.user.id;

			// Verificar se o query parameter completed=true foi enviado
			if (completed !== 'true') {
				throw new ValidationError('Para deletar tasks completadas, envie o query parameter completed=true');
			}

			await this.taskRepository.deleteCompletedByUserId(userId);
			res.status(204).send();
		} catch (error: unknown) {
			handleError(error, res);
		}
	}
}

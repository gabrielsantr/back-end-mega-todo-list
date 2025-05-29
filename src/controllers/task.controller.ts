import type { Request, Response } from 'express';
import { TaskRepository } from '../repositories/task.repository';
import { handleError } from '../utils/handler/error.handler';

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
				res.status(404).json({ error: 'Task não encontrada' });
				return;
			}

			// Verificar se a task pertence ao usuário
			if (task.userId !== userId) {
				res.status(403).json({ error: 'Acesso negado a esta task' });
				return;
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
				res.status(404).json({ error: 'Task não encontrada' });
				return;
			}

			if (existingTask.userId !== userId) {
				res.status(403).json({ error: 'Acesso negado a esta task' });
				return;
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
				res.status(404).json({ error: 'Task não encontrada' });
				return;
			}

			if (existingTask.userId !== userId) {
				res.status(403).json({ error: 'Acesso negado a esta task' });
				return;
			}

			await this.taskRepository.delete(id);
			res.json({ message: 'Task deletada com sucesso' });
		} catch (error: unknown) {
			handleError(error, res);
		}
	}

	async deleteMany(req: Request, res: Response) {
		try {
			const { ids } = req.body;
			await this.taskRepository.deleteMany(ids);
			res.json({ message: 'Tasks deletadas com sucesso' });
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
				res.status(400).json({
					error: 'Para deletar tasks completadas, envie o query parameter completed=true',
				});
				return;
			}

			const deletedCount = await this.taskRepository.deleteCompletedByUserId(userId);
			res.json({
				message: `${deletedCount} tasks completadas foram deletadas com sucesso`,
			});
		} catch (error: unknown) {
			handleError(error, res);
		}
	}
}

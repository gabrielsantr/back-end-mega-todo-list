import type { Request, Response } from 'express';
import { TaskRepository } from '../repositories/task.repository';
import { handleError } from '../utils/handler/error.handler';

export class TaskController {
	private taskRepository: TaskRepository;
	//TODO: Remover o userId hardcoded
	private userId: string;

	constructor() {
		this.taskRepository = new TaskRepository();
		this.userId = 'f2564ed2-4419-437d-ab46-d4aed582e8fd';
	}

	async create(req: Request, res: Response) {
		try {
			//const userId = req.user.id;
			const task = await this.taskRepository.create({
				...req.body,
				userId: this.userId,
			});

			res.status(201).json(task);
		} catch (error: unknown) {
			handleError(error, res);
		}
	}

	async findById(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const task = await this.taskRepository.findById(id);
			res.json(task);
			//TODO: Se não encontrar a task, retornar 404
		} catch (error: unknown) {
			handleError(error, res);
		}
	}

	async list(req: Request, res: Response) {
		try {
			//const userId = req.user.id;
			const userId = this.userId;
			const tasks = await this.taskRepository.findByUserId(userId);
			res.json(tasks);
		} catch (error: unknown) {
			handleError(error, res);
		}
	}

	async update(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const updateData = req.body;

			const task = await this.taskRepository.update(id, updateData);
			res.json(task);
		} catch (error: unknown) {
			handleError(error, res);
		}
	}

	async delete(req: Request, res: Response) {
		try {
			const { id } = req.params;
			await this.taskRepository.delete(id);
			res.status(204).send();
		} catch (error: unknown) {
			handleError(error, res);
		}
	}

	//TODO: Isso aqui é util? Teria que receber um array de tasks ids?
	// async deleteMany(req: Request, res: Response) {
	// 	try {
	// 		// await this.taskRepository.deleteMany();
	// 		res.status(204).send();
	// 	} catch (error) {
	// 		handleError(error, res);
	// 	}
	// }
}

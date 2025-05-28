import { PrismaClient } from '@prisma/client';
import type { ITask } from '../models/task.model';

export class TaskRepository {
	private prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}

	//cria a task sem a necessidade de passar os campos id, createdAt, updatedAt e completed que são gerados automaticamente
	async create(data: Omit<ITask, 'id' | 'createdAt' | 'updatedAt' | 'completed'>): Promise<ITask> {
		return this.prisma.task.create({
			data: {
				...data,
			},
		});
	}

	async findById(id: string): Promise<ITask | null> {
		return this.prisma.task.findUnique({
			where: { id },
		});
	}

	async findByUserId(userId: string): Promise<ITask[]> {
		return this.prisma.task.findMany({
			where: { userId },
			orderBy: [{ completed: 'asc' }, { priority: 'desc' }, { date: 'asc' }],
		});
	}

	async update(id: string, data: Partial<ITask>): Promise<ITask> {
		return this.prisma.task.update({
			where: { id },
			data,
		});
	}

	async delete(id: string): Promise<void> {
		await this.prisma.task.delete({
			where: { id },
		});
	}

	async deleteMany(ids: string[]): Promise<void> {
		await this.prisma.task.deleteMany({
			where: { id: { in: ids } },
		});
	}

	async deleteCompletedByUserId(userId: string): Promise<number> {
		const result = await this.prisma.task.deleteMany({
			where: {
				userId,
				completed: true,
			},
		});
		return result.count;
	}
}

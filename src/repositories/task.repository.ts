import DatabaseConnection from '../config/database';
import type { ITask } from '../models/task.model';

export class TaskRepository {
	private prisma = DatabaseConnection.getInstance();

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
			orderBy: [
				{ completed: 'asc' }, // false (não concluídas) primeiro, true (concluídas) por último
				{ priority: 'desc' }, // alta → média → baixa
				{ date: 'asc' }, // data mais próxima primeiro
			],
		});
	}

	async update(id: string, data: Partial<Omit<ITask, 'id' | 'createdAt' | 'updatedAt'>>): Promise<ITask> {
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

	async deleteCompletedByUserId(userId: string): Promise<void> {
		await this.prisma.task.deleteMany({
			where: {
				userId,
				completed: true,
			},
		});
	}
}

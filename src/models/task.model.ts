export interface ITask {
	id: string;
	title: string;
	description: string;
	priority: 'baixa' | 'média' | 'alta';
	date: string;
	completed: boolean;
	userId: string;
	createdAt: Date;
	updatedAt?: Date;
}

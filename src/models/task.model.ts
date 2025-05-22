export interface ITask {
	id: string;
	title: string;
	description: string;
	priority: 'LOW' | 'MEDIUM' | 'HIGH';
	date: Date;
	completed: boolean;
	userId: string;
	createdAt: Date;
	updatedAt?: Date;
}

import DatabaseConnection from '../config/database';
import type { IUser } from '../models/user.model';

export class UserRepository {
	private prisma = DatabaseConnection.getInstance();

	async create(userData: Omit<IUser, 'id' | 'createdAt'>): Promise<IUser> {
		return await this.prisma.user.create({
			data: userData,
		});
	}

	async findById(id: string): Promise<IUser | null> {
		return await this.prisma.user.findUnique({
			where: { id },
		});
	}

	async findByEmail(email: string): Promise<IUser | null> {
		return await this.prisma.user.findUnique({
			where: { email },
		});
	}

	async update(id: string, userData: Partial<Omit<IUser, 'id' | 'createdAt'>>): Promise<IUser> {
		return await this.prisma.user.update({
			where: { id },
			data: userData,
		});
	}

	async delete(id: string): Promise<void> {
		await this.prisma.user.delete({
			where: { id },
		});
	}
}

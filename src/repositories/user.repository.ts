import { PrismaClient } from '@prisma/client';
import DatabaseConnection from '../config/database';
import type { IUser } from '../models/user.model';

interface CreateUserData {
	email: string;
	password: string;
}

interface UpdateUserData {
	email?: string;
	password?: string;
}

export class UserRepository {
	private prisma = DatabaseConnection.getInstance();

	async create(userData: CreateUserData): Promise<IUser> {
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

	async update(id: string, userData: UpdateUserData): Promise<IUser> {
		return await this.prisma.user.update({
			where: { id },
			data: userData,
		});
	}

	async delete(id: string): Promise<IUser> {
		return await this.prisma.user.delete({
			where: { id },
		});
	}
}

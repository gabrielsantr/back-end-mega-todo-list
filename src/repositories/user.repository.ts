import { PrismaClient } from '@prisma/client';
import type { IUser } from '../models/user.model';

export class UserRepository {
	private prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}
}

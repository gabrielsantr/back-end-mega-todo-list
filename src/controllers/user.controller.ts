import type { Request, Response } from 'express';
import { UserRepository } from '../repositories/user.repository';
import { handleError } from '../utils/handler/error.handler';

export class UserController {
	private userRepository: UserRepository;

	constructor() {
		this.userRepository = new UserRepository();
	}

	async create(req: Request, res: Response) {
		try {
			console.log();
		} catch (error: unknown) {
			handleError(error, res);
		}
	}

	async findById(req: Request, res: Response) {
		try {
			console.log();
		} catch (error: unknown) {
			handleError(error, res);
		}
	}

	async list(req: Request, res: Response) {
		try {
			console.log();
		} catch (error: unknown) {
			handleError(error, res);
		}
	}

	async update(req: Request, res: Response) {
		try {
			console.log();
		} catch (error: unknown) {
			handleError(error, res);
		}
	}

	async delete(req: Request, res: Response) {
		try {
			console.log();
		} catch (error: unknown) {
			handleError(error, res);
		}
	}
}

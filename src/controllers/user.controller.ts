import bcrypt from 'bcrypt';
import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/user.repository';
import { ConflictError, NotFoundError, handleError } from '../utils/handler/error.handler';

export class UserController {
	private userRepository: UserRepository;

	constructor() {
		this.userRepository = new UserRepository();
	}

	//POST /auth/register
	async register(req: Request, res: Response) {
		try {
			const { email, password } = req.body;

			// Verificar se o usuário já existe
			const existingUser = await this.userRepository.findByEmail(email);
			if (existingUser) {
				throw new ConflictError('Usuário já existe com este email');
			}

			// Hash da senha
			const hashedPassword = await bcrypt.hash(password, 12);

			// Criar usuário
			const user = await this.userRepository.create({
				email,
				password: hashedPassword,
			});

			// Gerar JWT
			const jwtSecret = process.env.JWT_SECRET;
			if (!jwtSecret) {
				res.status(500).json({ error: 'Configuração de JWT não encontrada' });
				return;
			}

			const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, { expiresIn: '7d' });

			// Retornar usuário sem a senha
			const { password: _, ...userWithoutPassword } = user;

			res.status(201).json({
				message: 'Usuário criado com sucesso',
				user: userWithoutPassword,
				token,
			});
		} catch (error: unknown) {
			handleError(error, res);
		}
	}

	//POST /auth/login
	async login(req: Request, res: Response) {
		try {
			const { email, password } = req.body;

			// Buscar usuário por email
			const user = await this.userRepository.findByEmail(email);
			if (!user) {
				res.status(401).json({ error: 'Credenciais inválidas' });
				return;
			}

			// Verificar senha
			const isValidPassword = await bcrypt.compare(password, user.password);
			if (!isValidPassword) {
				res.status(401).json({ error: 'Credenciais inválidas' });
				return;
			}

			// Gerar JWT
			const jwtSecret = process.env.JWT_SECRET;
			if (!jwtSecret) {
				res.status(500).json({ error: 'Configuração de JWT não encontrada' });
				return;
			}

			const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, { expiresIn: '7d' });

			// Retornar usuário sem a senha
			const { password: _, ...userWithoutPassword } = user;

			res.json({
				message: 'Login realizado com sucesso',
				user: userWithoutPassword,
				token,
			});
		} catch (error: unknown) {
			handleError(error, res);
		}
	}

	//POST /auth/refresh
	async refreshToken(req: Request, res: Response) {
		try {
			// req.user vem do middleware de autenticação (token atual ainda válido)
			const { id, email } = req.user;

			// Gerar novo JWT com mais 7 dias
			const jwtSecret = process.env.JWT_SECRET;
			if (!jwtSecret) {
				res.status(500).json({ error: 'Configuração de JWT não encontrada' });
				return;
			}

			const newToken = jwt.sign({ id, email }, jwtSecret, { expiresIn: '7d' });

			res.json({
				message: 'Token renovado com sucesso',
				token: newToken,
			});
		} catch (error: unknown) {
			handleError(error, res);
		}
	}

	//GET /profile
	async profile(req: Request, res: Response) {
		try {
			// req.user vem do middleware de autenticação
			const userId = req.user.id;

			const user = await this.userRepository.findById(userId);
			if (!user) {
				throw new NotFoundError('Usuário não encontrado');
			}

			// Retornar usuário sem a senha
			const { password: _, ...userWithoutPassword } = user;
			res.json(userWithoutPassword);
		} catch (error: unknown) {
			handleError(error, res);
		}
	}

	//PUT /profile
	async updateProfile(req: Request, res: Response) {
		try {
			// req.user vem do middleware de autenticação
			const userId = req.user.id;
			const updateData = req.body;

			// Se está atualizando email, verificar se já existe
			if (updateData.email) {
				const emailExists = await this.userRepository.findByEmail(updateData.email);
				if (emailExists && emailExists.id !== userId) {
					throw new ConflictError('Email já está em uso');
				}
			}

			// Se está atualizando senha, fazer hash
			if (updateData.password) {
				updateData.password = await bcrypt.hash(updateData.password, 12);
			}

			const updatedUser = await this.userRepository.update(userId, updateData);

			// Retornar usuário sem a senha
			const { password: _, ...userWithoutPassword } = updatedUser;

			res.json({
				message: 'Perfil atualizado com sucesso',
				user: userWithoutPassword,
			});
		} catch (error: unknown) {
			handleError(error, res);
		}
	}

	//DELETE /profile
	async deleteAccount(req: Request, res: Response) {
		try {
			// req.user vem do middleware de autenticação
			const userId = req.user.id;

			await this.userRepository.delete(userId);

			res.status(204).send();
		} catch (error: unknown) {
			handleError(error, res);
		}
	}
}

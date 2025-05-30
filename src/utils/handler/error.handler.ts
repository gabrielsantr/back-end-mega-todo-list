import type { Response } from 'express';
import { Prisma } from '@prisma/client';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

export function handleError(error: unknown, res: Response) {
	console.error('Error:', error); // Log para debug

	// Erros do Prisma (banco de dados)
	if (error instanceof Prisma.PrismaClientKnownRequestError) {
		switch (error.code) {
			case 'P2002': // Unique constraint violation
				return res.status(409).json({
					error: 'Recurso já existe',
				});
			case 'P2025': // Record not found
				return res.status(404).json({
					error: 'Recurso não encontrado',
				});
			case 'P2003': // Foreign key constraint
				return res.status(400).json({
					error: 'Violação de integridade referencial',
				});
			default:
				return res.status(400).json({
					error: 'Erro de validação no banco de dados',
				});
		}
	}

	// Erros de validação do Prisma
	if (error instanceof Prisma.PrismaClientValidationError) {
		return res.status(400).json({
			error: 'Dados de entrada inválidos',
		});
	}

	// Erros de conexão com banco
	if (error instanceof Prisma.PrismaClientInitializationError) {
		return res.status(503).json({
			error: 'Serviço temporariamente indisponível',
		});
	}

	// Erros JWT (já tratados no middleware, mas por segurança)
	if (error instanceof JsonWebTokenError) {
		return res.status(401).json({
			error: 'Token inválido',
		});
	}
	if (error instanceof TokenExpiredError) {
		return res.status(401).json({
			error: 'Token expirado',
		});
	}

	// Erros personalizados da aplicação
	if (error instanceof ValidationError) {
		return res.status(400).json({
			error: error.message,
		});
	}

	if (error instanceof AuthorizationError) {
		return res.status(403).json({
			error: error.message,
		});
	}

	if (error instanceof NotFoundError) {
		return res.status(404).json({
			error: error.message,
		});
	}

	if (error instanceof ConflictError) {
		return res.status(409).json({
			error: error.message,
		});
	}

	// Erro genérico conhecido
	if (error instanceof Error) {
		return res.status(500).json({
			error: process.env.NODE_ENV === 'development' ? error.message : 'Erro interno do servidor',
		});
	}

	// Erro completamente desconhecido
	return res.status(500).json({
		error: 'Erro interno do servidor',
	});
}

// Classes de erro personalizadas
export class ValidationError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'ValidationError';
	}
}

export class AuthorizationError extends Error {
	constructor(message = 'Acesso negado') {
		super(message);
		this.name = 'AuthorizationError';
	}
}

export class NotFoundError extends Error {
	constructor(message = 'Recurso não encontrado') {
		super(message);
		this.name = 'NotFoundError';
	}
}

export class ConflictError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'ConflictError';
	}
}

import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// Estendendo o tipo Request para incluir user
declare global {
	namespace Express {
		interface Request {
			user: {
				id: string;
				email: string;
			};
		}
	}
}

export function authenticate(req: Request, res: Response, next: NextFunction) {
	try {
		// Pegar token do header Authorization
		const authHeader = req.headers.authorization;

		if (!authHeader || !authHeader.startsWith('Bearer ')) {
			res.status(401).json({ error: 'Token de acesso requerido' });
			return;
		}

		const token = authHeader.replace('Bearer ', '');

		// Verificar se JWT_SECRET existe
		const jwtSecret = process.env.JWT_SECRET;
		if (!jwtSecret) {
			res.status(500).json({ error: 'Configuração de JWT não encontrada' });
			return;
		}

		// Decodificar e verificar token

		const decoded = jwt.verify(token, jwtSecret) as { id: string; email: string };

		// Adicionar dados do usuário ao request
		req.user = decoded;
		next();
	} catch (error) {
		if (error instanceof jwt.JsonWebTokenError) {
			res.status(401).json({ error: 'Token inválido' });
			return;
		}
		if (error instanceof jwt.TokenExpiredError) {
			res.status(401).json({ error: 'Token expirado' });
			return;
		}
		res.status(500).json({ error: 'Erro interno do servidor' });
	}
}

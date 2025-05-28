import type { Request, Response, NextFunction } from 'express';
import type { ZodSchema } from 'zod';
import { ZodError } from 'zod';

export function validate(schema: ZodSchema) {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			schema.parse(req.body);
			next();
		} catch (error) {
			if (error instanceof ZodError) {
				const errorMessages = error.errors.map((issue) => ({
					message: issue.message,
				}));
				res.status(400).json({ error: 'Erro de validação', details: errorMessages });
				return;
			}
			res.status(500).json({ error: 'Erro interno do servidor' });
		}
	};
}

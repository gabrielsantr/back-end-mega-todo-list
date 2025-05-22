import type { Response } from 'express';

export function handleError(error: unknown, res: Response) {
	const statusCode = error instanceof Error ? 400 : 500;
	const errorMessage = error instanceof Error ? error.message : 'Erro interno do servidor';
	res.status(statusCode).json({ error: errorMessage });
}

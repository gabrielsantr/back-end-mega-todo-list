import type { NextFunction, Request, Response } from 'express';

export const loggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const timestamp = new Date().toISOString();
	const method = req.method;
	const url = req.originalUrl || req.url;
	const userAgent = req.get('User-Agent') || 'Unknown';

	console.log(`[${timestamp}] ${method} ${url} - User-Agent: ${userAgent}`);

	// Log adicional quando a resposta for enviada
	const originalSend = res.send;
	res.send = function (data: unknown) {
		console.log(`[${timestamp}] ${method} ${url} - Status: ${res.statusCode}`);
		return originalSend.call(this, data);
	};

	next();
};

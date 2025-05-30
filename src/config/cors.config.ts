import type { CorsOptions } from 'cors';

export const corsConfig: CorsOptions = {
	// Permitir cookies e autenticação
	credentials: true,

	// Métodos permitidos
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
};

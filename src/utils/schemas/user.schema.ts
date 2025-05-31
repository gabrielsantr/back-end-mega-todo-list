import { z } from 'zod';

//schema de usuario "genérico"
export const userSchema = z.object({
	email: z
		.string()
		.email('Email deve ter um formato válido')
		.max(255, 'Email deve ter no máximo 255 caracteres')
		.toLowerCase(),
	password: z
		.string()
		.min(8, 'Senha deve ter no mínimo 8 caracteres')
		.max(100, 'Senha deve ter no máximo 100 caracteres')
		.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Senha deve ter pelo menos: 1 letra minúscula, 1 maiúscula e 1 número'),
});

// schema para criação de usuário (registro)
export const createUserSchema = userSchema;

// schema para atualização (dados editáveis opcionais)
export const updateUserSchema = userSchema.partial();

// para login (email + password)
export const loginUserSchema = userSchema;

import { z } from 'zod';

//schema de usuario "genérico"
export const userSchema = z.object({
	id: z.string().uuid('ID deve ser um UUID válido'),
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
export const createUserSchema = userSchema.omit({ id: true });

// schema para atualização (apenas dados editáveis, sem id)
export const updateUserSchema = userSchema.omit({ id: true }).partial();

// para login (email + password)
export const loginUserSchema = userSchema.pick({ email: true, password: true });

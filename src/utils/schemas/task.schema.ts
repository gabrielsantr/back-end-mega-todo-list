import { z } from 'zod';

//schema de task "genérico"
export const taskSchema = z.object({
	title: z
		.string()
		.min(3, 'Título deve ter no mínimo 3 caracteres')
		.max(100, 'Título deve ter no máximo 100 caracteres')
		.trim(),
	description: z.string().max(500, 'Descrição deve ter no máximo 500 caracteres').trim(),
	priority: z.enum(['baixa', 'média', 'alta'], {
		errorMap: () => ({ message: 'Prioridade deve ser baixa, média ou alta' }),
	}),
	// Valida se é uma data ISO-8601 válida e se é uma data futura
	date: z
		.string()
		.datetime({ offset: true, message: 'Data deve estar em formato ISO-8601 completo' })
		.refine((dateStr) => new Date(dateStr) > new Date(), {
			message: 'Data deve ser futura',
		}),
	completed: z.boolean().optional().default(false),
});

// Schema para criação - remove o campo 'completed' que é definido automaticamente
export const createTaskSchema = taskSchema.omit({ completed: true });

// Schema para atualização - todos os campos são opcionais
export const updateTaskSchema = taskSchema.partial();

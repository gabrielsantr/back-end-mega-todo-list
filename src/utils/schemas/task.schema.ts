import { z } from 'zod';

//schema de task "genérico"
export const taskSchema = z.object({
	title: z
		.string()
		.min(3, 'Título deve ter no mínimo 3 caracteres')
		.max(100, 'Título deve ter no máximo 100 caracteres'),
	description: z.string().max(500, 'Descrição deve ter no máximo 500 caracteres'),
	priority: z.enum(['baixa', 'média', 'alta'], {
		errorMap: () => ({ message: 'Prioridade deve ser baixa, média ou alta' }),
	}),
	//aqui ele retorna erro se a data é fora do padrão ou se é futura, tem que usar pipe
	// se não ele retorna multiplos erros, sla
	date: z
		.string()
		.datetime({ offset: true, message: 'Data deve estar em ISO-8601 completo' })
		.refine((s) => new Date(s) > new Date(), { message: 'Data deve ser futura' }),

	completed: z.boolean().optional(),
});

//cria um schema de task especifico para cada os dois tipos de requisição, create e update
export const createTaskSchema = taskSchema.omit({ completed: true });
export const updateTaskSchema = taskSchema.partial();

import { z } from 'zod';

//cria um schema de task "genérico"
export const taskSchema = z.object({
	title: z
		.string()
		.min(3, 'Título deve ter no mínimo 3 caracteres')
		.max(100, 'Título deve ter no máximo 100 caracteres'),
	description: z.string().max(500, 'Descrição deve ter no máximo 500 caracteres'),
	priority: z.enum(['LOW', 'MEDIUM', 'HIGH'], {
		errorMap: () => ({ message: 'Prioridade deve ser LOW, MEDIUM ou HIGH' }),
	}),
	//aqui ele recebe uma string e transforma em date.
	//porque nao usar z.date? porque a requisiçao nao vai vir como um objeto Date e z.date trata apenas de objetos do tipo Date
	date: z
		.string()
		.refine((str) => !Number.isNaN(Date.parse(str)), { message: 'Data inválida' })
		.transform((str) => new Date(str))
		.refine((date) => date > new Date(), {
			message: 'Data deve ser futura',
		}),
	completed: z.boolean().optional(),
});

//cria um schema de task especifico para cada os dois tipos de requisição, create e update

export const createTaskSchema = taskSchema.omit({ completed: true });
export const updateTaskSchema = taskSchema.partial();

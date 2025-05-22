import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import tasksRouter from './routes/task.routes';

const app = express();

app.use(cors());
app.use(express.json());

const prisma = new PrismaClient();

//USE ROUTES
app.use(tasksRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Servidor rodando na porta ${PORT}`);
});

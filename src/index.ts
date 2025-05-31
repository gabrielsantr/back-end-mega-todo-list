import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import express from 'express';
import { loggingMiddleware } from './middlewares/logging.middleware';
import tasksRouter from './routes/task.routes';
import userRouter from './routes/user.routes';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Middleware de logging para todas as rotas
app.use(loggingMiddleware);

// USE ROUTES
app.use(tasksRouter);
app.use(userRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Servidor rodando na porta ${PORT}`);
});

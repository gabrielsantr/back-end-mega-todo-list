import cors from 'cors';
import express from 'express';
import { corsConfig } from './config/cors.config';
import { loggingMiddleware } from './middlewares/logging.middleware';
import tasksRouter from './routes/task.routes';
import userRouter from './routes/user.routes';

const app = express();

app.use(cors(corsConfig));
app.use(express.json());

// Middleware de logging para todas as rotas
app.use(loggingMiddleware);

app.get('/', (req, res) => {
	res.send('🦆😎');
});

// USE ROUTES
app.use(tasksRouter);
app.use(userRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Servidor rodando na porta ${PORT}`);
});

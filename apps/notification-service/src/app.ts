import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import routes from './routes';
import { errorHandler, notFound } from './utils/error';

dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

app.use('/notifications', routes.notifications);

app.use(notFound);
app.use(errorHandler);

export default app; 
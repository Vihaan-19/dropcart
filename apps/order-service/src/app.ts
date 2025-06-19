import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import { errorHandler } from './middlewares/error';
import { registerRoutes } from './routes';

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

registerRoutes(app);

app.use(errorHandler);

export default app;

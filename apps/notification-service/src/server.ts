import app from './app';
import { createServer } from 'http';
import { WebSocketGateway } from './services/websocket.gateway';
import logger from './utils/logger';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 8080;
const WS_PORT = process.env.WS_PORT ? Number(process.env.WS_PORT) : 8081;

const server = createServer(app);

server.listen(PORT, () => {
  logger.info(`Notification service listening on port ${PORT}`);
});

WebSocketGateway.init(WS_PORT); 
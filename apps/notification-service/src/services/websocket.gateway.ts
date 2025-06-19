import WebSocket, { Server } from 'ws';
import logger from '../utils/logger';

export class WebSocketGateway {
  private static wss: Server;

  static init(port: number) {
    if (this.wss) return;
    this.wss = new Server({ port });
    this.wss.on('connection', (ws) => {
      logger.info('WebSocket client connected');
    });
    logger.info(`WebSocket server started on port ${port}`);
  }

  static broadcast(event: string, data: any) {
    if (!this.wss) return;
    const message = JSON.stringify({ event, data });
    this.wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }
} 
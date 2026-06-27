import { Server as SocketServer } from 'socket.io';
import { Server } from 'http';
import logger from '../utils/logger';

export function createSocketServer(server: Server) {
  const io = new SocketServer(server, {
    cors: { origin: '*' },
    transports: ['websocket'],
    pingTimeout: 60000,
    pingInterval: 25000,
  });

  io.on('connection', (socket) => {
    logger.info(`Client connected: ${socket.id}`);

    socket.on('join-shipment', (trackingNumber: string) => {
      socket.join(`shipment-${trackingNumber}`);
      logger.info(`Socket ${socket.id} joined shipment-${trackingNumber}`);
    });

    socket.on('leave-shipment', (trackingNumber: string) => {
      socket.leave(`shipment-${trackingNumber}`);
    });

    socket.on('disconnect', () => {
      logger.info(`Client disconnected: ${socket.id}`);
    });

    socket.on('error', (err) => {
      logger.error(`Socket error: ${err.message}`);
    });
  });

  // Log any server-side errors
  io.engine.on('connection_error', (err) => {
    logger.error(`Engine connection error: ${err.message}`);
  });

  (global as any).io = io;
  return io;
}

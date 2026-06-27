import { Server as SocketServer } from 'socket.io';
import { Server } from 'http';
import { broadcastTrackingUpdate } from './broadcast-service';
import logger from '../utils/logger';

export function createSocketServer(server: Server) {
  const io = new SocketServer(server, {
    cors: { origin: '*' },
    transports: ['websocket']
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
  });

  // Store io globally for broadcast
  (global as any).io = io;
  return io;
}

import { Server } from 'socket.io';

export function broadcastTrackingUpdate(trackingNumber: string, event: any) {
  const io = (global as any).io as Server;
  if (io) {
    io.to(`shipment-${trackingNumber}`).emit('tracking-update', event);
  }
}

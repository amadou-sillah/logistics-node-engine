import { Server } from 'socket.io';
import { processGpsStream } from './processor';
import { broadcastTrackingUpdate } from '../socket/broadcast-service';

const shipments = ['S-1001', 'S-1002', 'S-1003'];

export function startGpsSimulator(io: Server) {
  setInterval(() => {
    shipments.forEach(trackingNumber => {
      const lat = 40.7 + (Math.random() - 0.5) * 0.1;
      const lng = -74.0 + (Math.random() - 0.5) * 0.1;
      const event = {
        trackingNumber,
        latitude: lat,
        longitude: lng,
        status: 'IN_TRANSIT',
        timestamp: new Date().toISOString()
      };
      const processed = processGpsStream(event);
      broadcastTrackingUpdate(trackingNumber, processed);
    });
  }, 5000);
}

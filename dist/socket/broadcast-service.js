"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.broadcastTrackingUpdate = broadcastTrackingUpdate;
function broadcastTrackingUpdate(trackingNumber, event) {
    const io = global.io;
    if (io) {
        io.to(`shipment-${trackingNumber}`).emit('tracking-update', event);
    }
}

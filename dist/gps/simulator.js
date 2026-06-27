"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startGpsSimulator = startGpsSimulator;
const processor_1 = require("./processor");
const broadcast_service_1 = require("../socket/broadcast-service");
const shipments = ['S-1001', 'S-1002', 'S-1003'];
function startGpsSimulator(io) {
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
            const processed = (0, processor_1.processGpsStream)(event);
            (0, broadcast_service_1.broadcastTrackingUpdate)(trackingNumber, processed);
        });
    }, 5000);
}

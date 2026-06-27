"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSocketServer = createSocketServer;
const socket_io_1 = require("socket.io");
const logger_1 = __importDefault(require("../utils/logger"));
function createSocketServer(server) {
    const io = new socket_io_1.Server(server, {
        cors: { origin: '*' },
        transports: ['websocket']
    });
    io.on('connection', (socket) => {
        logger_1.default.info(`Client connected: ${socket.id}`);
        socket.on('join-shipment', (trackingNumber) => {
            socket.join(`shipment-${trackingNumber}`);
            logger_1.default.info(`Socket ${socket.id} joined shipment-${trackingNumber}`);
        });
        socket.on('leave-shipment', (trackingNumber) => {
            socket.leave(`shipment-${trackingNumber}`);
        });
        socket.on('disconnect', () => {
            logger_1.default.info(`Client disconnected: ${socket.id}`);
        });
    });
    // Store io globally for broadcast
    global.io = io;
    return io;
}

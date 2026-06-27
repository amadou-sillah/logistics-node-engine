"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = require("./server/app");
const socket_server_1 = require("./socket/socket-server");
const simulator_1 = require("./gps/simulator");
const logger_1 = __importDefault(require("./utils/logger"));
const PORT = process.env.PORT || 3000;
const app = (0, app_1.createApp)();
const server = app.listen(PORT, () => {
    logger_1.default.info(`Node tracking engine listening on port ${PORT}`);
});
const io = (0, socket_server_1.createSocketServer)(server);
(0, simulator_1.startGpsSimulator)(io);

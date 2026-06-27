import dotenv from 'dotenv';
dotenv.config();

import { createServer } from 'http';
import { createApp } from './server/app';
import { createSocketServer } from './socket/socket-server';
import { startGpsSimulator } from './gps/simulator';
import logger from './utils/logger';

const PORT = process.env.PORT || 3000;

const app = createApp();
const server = createServer(app);  // single HTTP server

const io = createSocketServer(server);

startGpsSimulator(io);

server.listen(PORT, () => {
  logger.info(`Node tracking engine listening on port ${PORT}`);
});

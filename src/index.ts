import dotenv from 'dotenv';
dotenv.config();
import { createApp } from './server/app';
import { createSocketServer } from './socket/socket-server';
import { startGpsSimulator } from './gps/simulator';
import logger from './utils/logger';

const PORT = process.env.PORT || 3000;

const app = createApp();
const server = app.listen(PORT, () => {
  logger.info(`Node tracking engine listening on port ${PORT}`);
});

const io = createSocketServer(server);
startGpsSimulator(io);

import express from 'express';
import cors from 'cors';
import routes from './routes';

export function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use('/api/node', routes);
  return app;
}

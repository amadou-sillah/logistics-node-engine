import express from 'express';
import cors from 'cors';
import path from 'path';
import apiRoutes from './routes';

export function createApp() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());

  // API routes (mounted under /api/node)
  app.use('/api/node', apiRoutes);

  // Serve static files from the 'dist' folder (one level up from this file)
  const distPath = path.join(__dirname, '../dist');
  app.use(express.static(distPath));

  // SPA fallback: serve index.html for any unhandled request
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });

  return app;
}
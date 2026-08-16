import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import connectDatabase from './config/dbConfig';
import { env } from './config/serverConfig';
import apiRouter from './routers/api.router';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter);

app.get('/health', async (_req, res) => {
  try {
    if (mongoose.connection.readyState !== 1 || !mongoose.connection.db) {
      return res.status(503).json({ status: 'unhealthy' });
    }

    await mongoose.connection.db.admin().ping();
    return res.status(200).json({ status: 'ok' });
  } catch {
    return res.status(503).json({ status: 'unhealthy' });
  }
});

app.listen(env.PORT, () => {
  console.log(`Server running on http://localhost:${env.PORT}`);
  connectDatabase();
});

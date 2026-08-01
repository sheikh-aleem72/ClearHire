import express from 'express';
import cors from 'cors';
import connectDatabase from './config/dbConfig';
import { env } from './config/serverConfig';
import apiRouter from './routers/api.router';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter);

app.listen(env.PORT, () => {
  console.log(`Server running on http://localhost:${env.PORT}`);
  connectDatabase();
});

import express, { json } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { connectDB } from './db/connection.js';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

dotenv.config();
const app = express();
app.use(json());
app.use(cors(
  {
    origin: 'http://localhost:3000',
    credentials: true
  }
));
app.use(cookieParser());

app.use('/', authRoutes);
app.use('/', taskRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
})
import express, { json } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { connectDB } from './db/connection.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();
const app = express();
app.use(json());
app.use(cors())

app.use('/', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB()
  console.log(`Server is running on port ${PORT}`);
})
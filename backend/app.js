import express, { json } from 'express';
import { connect } from 'mongoose';
import { config } from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';

config();
const app = express();
app.use(json());
app.use(cors())

connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to database'))
  .catch(err => console.log(err))


app.use('/', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
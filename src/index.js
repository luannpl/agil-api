import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './modules/auth/auth.routes.js';
import userRoutes from './modules/user/user.routes.js'

dotenv.config();
const app = express();

app.use(express.json());
app.use('/auth', authRoutes)
app.use('/users', userRoutes);

export default app;
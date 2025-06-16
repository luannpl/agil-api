import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes.js'

const app = express();
dotenv.config();

app.use(express.json());
app.use('/users', userRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
})
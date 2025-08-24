import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import UserRoutes from "./modules/usuario/usuario.route";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.send("Bem-vindo à API Agil!");
});

app.use("/usuarios", UserRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

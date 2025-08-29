import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import UserRoutes from "./modules/usuario/usuario.route.js";
import { conditionalBodyParser } from "./middlewares/conditionalBodyParser.js";
import { VeiculosRoutes } from "./modules/veiculos/veiculo.route.js";
import AuthRoutes from "./modules/auth/auth.route.js";
import { corsOptions } from "./config/cors.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors(corsOptions));
app.use(conditionalBodyParser);
app.use(cookieParser());

app.get("/", (_, res) => {
  res.send("Bem-vindo à API Agil!!!");
});

app.use("/auth", AuthRoutes);
app.use("/usuarios", UserRoutes);
app.use("/veiculos", VeiculosRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

import express from "express";
import { VeiculosRoutes } from "../modules/veiculos/veiculo.route.js";
import AuthRoutes from "../modules/auth/auth.route.js";
import UserRoutes from "../modules/usuario/usuario.route.js";

const v1Router = express.Router();

v1Router.use("/auth", AuthRoutes);
v1Router.use("/usuarios", UserRoutes);
v1Router.use("/veiculos", VeiculosRoutes);

export default v1Router;

import express from "express";
import { VeiculosRoutes } from "../modules/veiculos/veiculo.route.js";
import AuthRoutes from "../modules/auth/auth.route.js";
import UserRoutes from "../modules/usuario/usuario.route.js";
import { ContatoRouter } from "../modules/contato/contato.route.js";

const v1Router = express.Router();

v1Router.use("/auth", AuthRoutes);
v1Router.use("/usuarios", UserRoutes);
v1Router.use("/veiculos", VeiculosRoutes);
v1Router.use("/contato", ContatoRouter);

export default v1Router;

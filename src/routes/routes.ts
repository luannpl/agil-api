import express from "express";
import { VeiculosRoutes } from "../modules/veiculos/veiculo.route.js";
import AuthRoutes from "../modules/auth/auth.route.js";
import UserRoutes from "../modules/usuario/usuario.route.js";
import { ContatoRouter } from "../modules/contato/contato.route.js";
import { ContratosRoutes } from "../modules/contratos/contrato.route.js";
import { DashboardRoutes } from "../modules/dashboard/dashboard.route.js";

const v1Router = express.Router();

v1Router.use("/auth", AuthRoutes);
v1Router.use("/usuarios", UserRoutes);
v1Router.use("/veiculos", VeiculosRoutes);
v1Router.use("/contratos", ContratosRoutes);
v1Router.use("/contato", ContatoRouter);
v1Router.use("/dashboard", DashboardRoutes);

export default v1Router;

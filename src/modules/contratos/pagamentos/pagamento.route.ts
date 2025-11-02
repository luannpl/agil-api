import { Router } from "express";
import { PagamentoController } from "./pagemento.controller.js";
import { authenticate } from "../../../middlewares/authenticate.js";

export const PagamentosRoutes = Router();

PagamentosRoutes.get(
  "/:idPagamento",
  authenticate,
  PagamentoController.getPagamentoById
);
PagamentosRoutes.put(
  "/:idPagamento",
  authenticate,
  PagamentoController.updatePagamentoValor
);

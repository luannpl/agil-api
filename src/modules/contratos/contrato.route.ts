import { Router } from "express";
import { authenticate } from "../../middlewares/authenticate.js";
import { validate } from "../../middlewares/validate.js";
import { CreateContratoSchema } from "./schemas/createContrato.schema.js";
import { ContratoController } from "./contrato.controller.js";

export const ContratosRoutes = Router();

ContratosRoutes.post(
  "/",
  authenticate,
  validate(CreateContratoSchema),
  ContratoController.createContrato
);

ContratosRoutes.get("/", authenticate, ContratoController.getAllContratos);

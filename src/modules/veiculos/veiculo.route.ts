import { Router } from "express";
import { VeiculosController } from "./veiculo.controller.js";
import { upload } from "../../middlewares/uploadMiddleware.js";
import { validate } from "../../middlewares/validate.js";
import { CreateVeiculoSchema } from "./schemas/createVeiculo.schema.js";
import { authenticate } from "../../middlewares/authenticate.js";

export const VeiculosRoutes = Router();

VeiculosRoutes.post(
  "/",
  authenticate,
  upload.single("imagem"),
  validate(CreateVeiculoSchema),
  VeiculosController.createVeiculo
);
VeiculosRoutes.get("/", VeiculosController.getAllVeiculos);

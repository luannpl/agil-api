import { Router } from "express";
import { VeiculosController } from "./veiculo.controller.js";
import { upload } from "../../middlewares/uploadMiddleware.js";
import { validate } from "../../middlewares/validate.js";
import { CreateVeiculoSchema } from "./schemas/createVeiculo.schema.js";

export const VeiculosRoutes = Router();

VeiculosRoutes.get("/", VeiculosController.getAllVeiculos);
VeiculosRoutes.post(
  "/",
  upload.single("imagem"),
  validate(CreateVeiculoSchema),
  VeiculosController.createVeiculo
);

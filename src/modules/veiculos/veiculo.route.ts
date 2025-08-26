import { Router } from "express";
import { VeiculosController } from "./veiculo.controller";
import { upload } from "../../middlewares/uploadMiddleware";
import { validate } from "../../middlewares/validate";
import { CreateVeiculoSchema } from "./schemas/createVeiculo.schema";

export const VeiculosRoutes = Router();

VeiculosRoutes.get("/", VeiculosController.getAllVeiculos);
VeiculosRoutes.post(
  "/",
  upload.single("imagem"),
  validate(CreateVeiculoSchema),
  VeiculosController.createVeiculo
);

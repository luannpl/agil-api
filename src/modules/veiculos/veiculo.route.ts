import { Router } from "express";
import { VeiculosController } from "./veiculo.controller.js";
import { upload } from "../../middlewares/uploadMiddleware.js";
import { validate } from "../../middlewares/validate.js";
import { CreateVeiculoSchema } from "./schemas/createVeiculo.schema.js";
import { authenticate } from "../../middlewares/authenticate.js";
import { buscarVeiculoSchema } from "./schemas/buscarVeiculo.schema.js";

export const VeiculosRoutes = Router();

VeiculosRoutes.post(
  "/",
  authenticate,
  upload.single("imagem"),
  validate(CreateVeiculoSchema),
  VeiculosController.createVeiculo
);
VeiculosRoutes.post(
  "/placa",
  authenticate,
  validate(buscarVeiculoSchema),
  VeiculosController.buscarPorPlaca
);
VeiculosRoutes.get("/", VeiculosController.getAllVeiculos);
VeiculosRoutes.get("/destaques", VeiculosController.getDestaques);
VeiculosRoutes.get("/:id", VeiculosController.getVeiculoById);
VeiculosRoutes.delete("/:id", authenticate, VeiculosController.deleteVeiculo);

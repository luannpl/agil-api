import { Router } from "express";
import { validate } from "../../middlewares/validate.js";
import { CreateContatoSchema } from "./schemas/createContato.schema.js";
import { ContatoController } from "./contato.controller.js";

export const ContatoRouter = Router();

ContatoRouter.post(
  "/",
  validate(CreateContatoSchema),
  ContatoController.createContato
);

ContatoRouter.get("/", ContatoController.getAllContatos);

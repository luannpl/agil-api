import z from "zod";
import { CreateVeiculoSchema } from "../schemas/createVeiculo.schema.js";

export type CreateVeiculoDto = z.infer<typeof CreateVeiculoSchema>;

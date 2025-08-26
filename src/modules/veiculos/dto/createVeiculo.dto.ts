import z from "zod";
import { CreateVeiculoSchema } from "../schemas/createVeiculo.schema";

export type CreateVeiculoDto = z.infer<typeof CreateVeiculoSchema>;

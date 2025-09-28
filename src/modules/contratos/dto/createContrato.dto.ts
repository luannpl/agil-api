import z from "zod";
import { CreateContratoSchema } from "../schemas/createContrato.schema.js";

export type CreateContratoDto = z.infer<typeof CreateContratoSchema>;

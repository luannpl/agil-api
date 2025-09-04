import z from "zod";
import { CreateContatoSchema } from "../schemas/createContato.schema.js";

export type CreateContatoDto = z.infer<typeof CreateContatoSchema>;

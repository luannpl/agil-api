import z from "zod";
import { CreateProfileClienteSchema } from "../../schemas/profile/createProfileCliente.schema.js";

export type CreateProfileClienteDto = z.infer<
  typeof CreateProfileClienteSchema
>;

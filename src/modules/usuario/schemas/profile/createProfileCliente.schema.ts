import z from "zod";

export const CreateProfileClienteSchema = z.object({
  cpf: z.string().min(11).max(14),
  rg: z.string().optional(),
  cnh: z.string().optional(),
  cep: z.string().min(8).max(9),
  endereco: z.string().min(5),
  descricao: z.string().min(1),
});

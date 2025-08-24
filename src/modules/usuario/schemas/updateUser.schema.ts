import { TipoUsuario } from "@prisma/client";
import z from "zod";

export const UpdateUserSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório").optional(),
  email: z.string().email("Formato de e-mail inválido").optional(),
  senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres").optional(),
  tipo: z.nativeEnum(TipoUsuario).optional(),
});

import { z } from "zod";
import { TipoUsuario } from "@prisma/client";

// Schema para criação de usuário
export const CreateUserSchema = z.object({
  nome: z
    .string({
      required_error: "Nome é obrigatório",
    })
    .min(1, "Nome é obrigatório"),

  email: z
    .string({
      required_error: "E-mail é obrigatório",
    })
    .email("Formato de e-mail inválido"),

  senha: z
    .string({
      required_error: "Senha é obrigatória",
    })
    .min(6, "Senha deve ter no mínimo 6 caracteres"),

  tipo: z.nativeEnum(TipoUsuario, {
    required_error: "Tipo de usuário é obrigatório",
    invalid_type_error: "Tipo de usuário inválido",
  }),
});

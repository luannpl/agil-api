import { z } from "zod";
import { TipoUsuario } from "@prisma/client";

export const CreateUserSchema = z.object({
  nome: z
    .string({ required_error: "Nome é obrigatório" })
    .min(1, "Nome é obrigatório"),

  email: z
    .string({ required_error: "E-mail é obrigatório" })
    .email("Formato de e-mail inválido"),

  telefone: z
    .string({ required_error: "Telefone é obrigatório" })
    .min(1, "Telefone deve ter no mínimo 1 caractere"),

  senha: z
    .string({ required_error: "Senha é obrigatória" })
    .min(6, "Senha deve ter no mínimo 6 caracteres"),

  tipo: z.nativeEnum(TipoUsuario, {
    required_error: "Tipo de usuário é obrigatório",
    invalid_type_error: "Tipo de usuário inválido",
  }),

  dataNasc: z.preprocess(
    (val) => (val ? new Date(val as string) : undefined),
    z.date().optional()
  ),

  cpf: z
    .string()
    .transform((v) => v?.trim())
    .optional()
    .nullable()
    .refine(
      (val) => !val || /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/.test(val),
      "CPF inválido"
    ),

  rg: z
    .string()
    .transform((v) => v?.trim())
    .optional()
    .nullable(),

  cnh: z
    .string()
    .transform((v) => v?.trim())
    .optional()
    .nullable(),

  cep: z
    .string()
    .optional()
    .refine((val) => !val || /^\d{5}-?\d{3}$/.test(val), "CEP inválido"),

  endereco: z.string().optional(),
  bairro: z.string().optional(),
  cidade: z.string().optional(),
  estado: z.string().optional(),
  numero: z.string().optional(),
  complemento: z.string().optional(),
  descricao: z.string().optional(),
  profissao: z.string().optional(),
  estadoCivil: z.string().optional(),
  nacionalidade: z.string().optional(),
});

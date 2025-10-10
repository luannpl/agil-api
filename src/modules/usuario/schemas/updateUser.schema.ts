import { TipoUsuario } from "@prisma/client";
import z from "zod";

export const UpdateUserSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório").optional(),
  email: z.string().email("Formato de e-mail inválido").optional(),
  telefone: z
    .string()
    .min(1, "Telefone deve ter no mínimo 1 caracteres")
    .optional(),
  tipo: z.nativeEnum(TipoUsuario).optional(),
  dataNasc: z.preprocess(
    (val) => (val ? new Date(val as string) : undefined),
    z.date().optional()
  ),

  cpf: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/.test(val),
      "CPF inválido"
    ),

  rg: z.string().optional(),

  cnh: z.string().optional(),

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

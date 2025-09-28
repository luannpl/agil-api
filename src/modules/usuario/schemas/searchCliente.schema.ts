import z from "zod";

export const searchCliente = z.object({
  cpf: z
    .string()
    .min(11, "CPF deve ter no mínimo 11 números")
    .max(14, "CPF deve ter no máximo 14 caracteres")
    .refine(
      (val) => /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/.test(val),
      "Formato de CPF inválido"
    ),
});

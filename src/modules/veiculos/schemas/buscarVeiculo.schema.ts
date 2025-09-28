import z from "zod";

export const buscarVeiculoSchema = z.object({
  placa: z
    .string()
    .min(7, "Placa deve ter no mínimo 7 caracteres")
    .max(8, "Placa deve ter no máximo 8 caracteres")
    .refine(
      (val) =>
        /^[A-Z]{3}-?\d{4}$/i.test(val) || /^[A-Z]{3}-?\d[A-Z]\d{2}$/i.test(val),
      "Formato de placa inválido"
    ),
});

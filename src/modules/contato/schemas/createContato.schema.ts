import z from "zod";

export const CreateContatoSchema = z.object({
  nome: z
    .string({
      required_error: "Nome é obrigatório",
    })
    .min(1, "Nome é obrigatório"),
  email: z
    .string({
      required_error: "Email é obrigatório",
    })
    .email("Email inválido"),
  telefone: z
    .string({
      required_error: "Telefone é obrigatório",
    })
    .min(1, "Telefone é obrigatório"),
  mensagem: z
    .string({
      required_error: "Mensagem é obrigatória",
    })
    .min(1, "Mensagem é obrigatória"),
});

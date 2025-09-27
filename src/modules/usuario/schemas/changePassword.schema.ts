import { z } from "zod";

export const ChangePasswordSchema = z
  .object({
    senhaAtual: z.string(),
    novaSenha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
    confirmarNovaSenha: z.string(),
  })
  .refine((data) => data.novaSenha === data.confirmarNovaSenha, {
    message: "As senhas não coincidem",
    path: ["confirmarNovaSenha"],
  });

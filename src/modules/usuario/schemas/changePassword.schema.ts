import { z } from "zod";

export const ChangePasswordSchema = z
  .object({
    oldPassword: z.string(),
    newPassword: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "As senhas não coincidem",
    path: ["confirmNewPassword"],
  });

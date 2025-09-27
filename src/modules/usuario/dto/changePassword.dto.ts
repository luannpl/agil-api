import z from "zod";
import { ChangePasswordSchema } from "../schemas/changePassword.schema";

export type ChangePasswordDto = z.infer<typeof ChangePasswordSchema>;

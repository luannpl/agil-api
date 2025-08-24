import type z from "zod";
import type { UpdateUserSchema } from "../schemas/updateUser.schema.js";

export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;

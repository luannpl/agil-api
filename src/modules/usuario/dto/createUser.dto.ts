import type z from "zod";
import type { CreateUserSchema } from "../schemas/createUser.schema.js";

export type CreateUserDto = z.infer<typeof CreateUserSchema>;

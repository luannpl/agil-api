import { TipoUsuario } from "@prisma/client";

export type User = {
  id: string;
  email: string;
  nome: string;
  senha: string;
  tipo: TipoUsuario;
  createdAt: Date;
  updatedAt: Date;
};

import { prisma } from "../../prisma/client.js";
import { CreateUserDto } from "./dto/createUser.dto.js";

export const UserRepository = {
  async findClienteByCpf(cpf: string) {
    return prisma.clienteProfile.findUnique({ where: { cpf } });
  },

  async findClienteByRg(rg: string) {
    if (!rg) return null;
    return prisma.clienteProfile.findUnique({ where: { rg } });
  },

  async findClienteByCnh(cnh: string) {
    if (!cnh) return null;
    return prisma.clienteProfile.findUnique({ where: { cnh } });
  },

  async createUserWithProfile(data: CreateUserDto) {
    // Apenas criação dentro da transação
    return prisma.$transaction(async (tx) => {
      const user = await tx.usuario.create({
        data: {
          nome: data.nome,
          email: data.email,
          telefone: data.telefone,
          senha: data.senha,
          tipo: data.tipo,
        },
      });

      let clienteProfile = null;
      if (user.tipo === "cliente" && data.clienteProfile) {
        clienteProfile = await tx.clienteProfile.create({
          data: {
            ...data.clienteProfile,
            usuario: { connect: { id: user.id } },
          },
        });
      }

      return { user, clienteProfile };
    });
  },

  async findAll() {
    return await prisma.usuario.findMany();
  },

  async findById(id: string) {
    return await prisma.usuario.findUnique({
      where: { id },
    });
  },

  async findByEmail(email: string) {
    return await prisma.usuario.findUnique({
      where: { email },
    });
  },

  async update(id: string, data: any) {
    return await prisma.usuario.update({
      where: { id },
      data,
    });
  },

  async delete(id: string) {
    return await prisma.usuario.delete({
      where: { id },
    });
  },
};

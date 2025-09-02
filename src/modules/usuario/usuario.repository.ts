import { prisma } from "../../prisma/client.js";
import { CreateUserDto } from "./dto/createUser.dto.js";

export const UserRepository = {
  async create(data: CreateUserDto) {
    const user = await prisma.usuario.create({
      data,
    });
    return user;
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

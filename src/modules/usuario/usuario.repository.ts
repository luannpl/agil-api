import { prisma } from "../../prisma/client";
import { CreateUserDto } from "./dto/createUser.dto";

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

  async findByEmail(email: string) {
    return await prisma.usuario.findUnique({
      where: { email },
    });
  },
};

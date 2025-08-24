import { prisma } from "../../prisma/client";
import { CreateUserDto } from "./dto/createUser.dto";

export const UserRepository = {
  async create(data: CreateUserDto) {
    const user = await prisma.usuario.create({
      data,
    });
    return user;
  },
};

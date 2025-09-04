import { prisma } from "../../prisma/client.js";
import { CreateContatoDto } from "./dto/createContato.dto.js";

export const ContatoRepository = {
  async create(data: CreateContatoDto) {
    return await prisma.contato.create({ data });
  },

  async getAll() {
    return await prisma.contato.findMany();
  },
};

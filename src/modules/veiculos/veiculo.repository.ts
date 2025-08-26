import { prisma } from "../../prisma/client";
import { CreateVeiculoDto } from "./dto/createVeiculo.dto";

export const VeiculosRepository = {
  async findAll() {
    return await prisma.veiculo.findMany();
  },

  async create(data: any) {
    return await prisma.veiculo.create({ data });
  },
};

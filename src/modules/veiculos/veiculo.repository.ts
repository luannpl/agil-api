import { prisma } from "../../prisma/client.js";

export const VeiculosRepository = {
  async create(data: any) {
    return await prisma.veiculo.create({ data });
  },

  async findAll() {
    return await prisma.veiculo.findMany();
  },

  async findById(id: number) {
    return await prisma.veiculo.findUnique({
      where: { id },
    });
  },

  async findByPlaca(placa: string) {
    return await prisma.veiculo.findUnique({
      where: { placa },
    });
  },
};

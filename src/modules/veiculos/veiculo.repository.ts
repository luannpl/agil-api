import { prisma } from "../../prisma/client.js";

export const VeiculosRepository = {
  async findAll() {
    return await prisma.veiculo.findMany();
  },

  async findByPlaca(placa: string) {
    return await prisma.veiculo.findUnique({
      where: { placa },
    });
  },

  async create(data: any) {
    return await prisma.veiculo.create({ data });
  },
};

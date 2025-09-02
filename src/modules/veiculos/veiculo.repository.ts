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

  async findDestaques() {
    return await prisma.veiculo.findMany({
      orderBy: [{ valor: "desc" }, { ano: "desc" }],
      take: 4,
    });
  },

  async findByPlaca(placa: string) {
    return await prisma.veiculo.findUnique({
      where: { placa },
    });
  },

  async delete(id: number) {
    return await prisma.veiculo.delete({
      where: { id },
    });
  },
};

import { prisma } from "../../prisma/client.js";
import { CreateContratoDto } from "./dto/createContrato.dto.js";

export const ContratoRepository = {
  async create(data: CreateContratoDto) {
    return await prisma.contrato.create({ data });
  },

  async getAllContratos() {
    return await prisma.contrato.findMany({
      include: {
        usuario: true,
        veiculo: true,
      },
    });
  },

  async delete(id: string) {
    return await prisma.contrato.delete({
      where: { id },
    });
  },

  async findById(id: string) {
    return await prisma.contrato.findUnique({
      where: { id },
      include: {
        usuario: true,
        veiculo: true,
      },
    });
  },

  async findByVeiculoId(veiculoId: number) {
    return await prisma.contrato.findMany({
      where: { veiculoId },
    });
  },

  async totalContratosMes() {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const endOfMonth = new Date(startOfMonth);
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);
    endOfMonth.setDate(0);
    endOfMonth.setHours(23, 59, 59, 999);

    const total = await prisma.contrato.count({
      where: {
        createdAt: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
    });

    return total;
  },
};

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
      include:{
        usuario: true,
        veiculo: true,
      }
    });
  },

  async findByVeiculoId(veiculoId: number) {
    return await prisma.contrato.findMany({
      where: { veiculoId },
    });
  },
};

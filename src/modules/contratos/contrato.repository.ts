import { prisma } from "../../prisma/client.js";
import { CreateContratoDto } from "./dto/createContrato.dto.js";

export const ContratoRepository = {
  async create(data: CreateContratoDto) {
    return await prisma.contrato.create({ data });
  },

  async getAllContratos() {
    return await prisma.contrato.findMany();
  },
};

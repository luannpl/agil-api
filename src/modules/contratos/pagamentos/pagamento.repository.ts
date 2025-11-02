import { StatusPagamento } from "@prisma/client";
import { prisma } from "../../../prisma/client.js";

export const PagamentoRepository = {
  async findByContratoId(contratoId: string) {
    return await prisma.pagamento.findMany({
      where: { contratoId },
      orderBy: { numeroParcela: "asc" },
    });
  },

  async findById(id: string) {
    return await prisma.pagamento.findUnique({
      where: { id },
    });
  },

  async updateStatus(id: string, status: StatusPagamento) {
    return await prisma.pagamento.update({
      where: { id },
      data: { status },
    });
  },

  async update(
    id: string,
    data: Partial<{
      valorParcela: number;
      status: StatusPagamento;
    }>
  ) {
    return await prisma.pagamento.update({
      where: { id },
      data,
    });
  },
};

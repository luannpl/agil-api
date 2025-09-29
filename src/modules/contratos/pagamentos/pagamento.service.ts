import { StatusPagamento } from "@prisma/client";
import { PagamentoRepository } from "./pagamento.repository.js";
import { BadRequestError } from "../../../errors/HttpErrors.js";

export const PagamentoService = {
  async getPagamentosByContratoId(id: string) {
    const pagamentos = await PagamentoRepository.findByContratoId(id);
    return pagamentos;
  },

  async updateStatusPagamento(pagamentoId: string, status: StatusPagamento) {
    const pagamento = await PagamentoRepository.findById(pagamentoId);
    if (!pagamento) {
      throw new BadRequestError("Parcela não encontrada");
    }
    const updatedPagamento = await PagamentoRepository.updateStatus(
      pagamentoId,
      status
    );
    return updatedPagamento;
  },
};

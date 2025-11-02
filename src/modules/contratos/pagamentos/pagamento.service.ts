import { StatusPagamento } from "@prisma/client";
import { PagamentoRepository } from "./pagamento.repository.js";
import { BadRequestError } from "../../../errors/HttpErrors.js";
import dayjs from "dayjs";

export const PagamentoService = {
  async getPagamentosById(id: string) {
    const pagamento = await PagamentoRepository.findById(id);
    if (!pagamento) {
      throw new BadRequestError("Parcela não encontrada");
    }
    return pagamento;
  },

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

  async updateValorPagamento(pagamentoId: string) {
    const pagamento = await PagamentoRepository.findById(pagamentoId);

    if (!pagamento) {
      throw new BadRequestError("Parcela não encontrada");
    }

    const hoje = dayjs();
    const vencimento = dayjs(pagamento.dataVencimento);

    if (vencimento.isAfter(hoje)) {
      return pagamento;
    }

    const diasAtraso = hoje.diff(vencimento, "day");

    const valorParcela = pagamento.valorParcelaInicial;
    const multa = valorParcela * 0.05;
    const jurosPorDia = (valorParcela * 0.13) / 30;
    const juros = jurosPorDia * diasAtraso;

    const valorAtualizado = valorParcela + multa + juros;

    const pagamentoAtualizado = await PagamentoRepository.update(pagamentoId, {
      valorParcela: valorAtualizado,
      status: "ATRASADO",
    });

    return {
      ...pagamentoAtualizado,
      multa: multa.toFixed(2),
      juros: juros.toFixed(2),
      diasAtraso,
      valorAtualizado: valorAtualizado.toFixed(2),
    };
  },
};

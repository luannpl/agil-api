import { Request, Response } from "express";
import { HttpError } from "../../../errors/HttpErrors.js";
import { PagamentoService } from "./pagamento.service.js";

export const PagamentoController = {
  async getPagamentoById(req: Request, res: Response) {
    try {
      const { idPagamento } = req.params;
      const pagamento = await PagamentoService.getPagamentosById(idPagamento);
      res.status(200).json(pagamento);
    } catch (error: any) {
      if (error instanceof HttpError) {
        res.status(error.status).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  },

  async updatePagamentoValor(req: Request, res: Response) {
    try {
      const { idPagamento } = req.params;
      const pagamentoAtualizado = await PagamentoService.updateValorPagamento(
        idPagamento
      );
      res.status(200).json(pagamentoAtualizado);
    } catch (error: any) {
      if (error instanceof HttpError) {
        res.status(error.status).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  },
};

import { Request, Response } from "express";
import { HttpError } from "../../errors/HttpErrors.js";
import { ContratoService } from "./contrato.service.js";

export const ContratoController = {
  async createContrato(req: Request, res: Response) {
    try {
      const contrato = await ContratoService.createContrato(req.body);
      res.status(201).json(contrato);
    } catch (error: any) {
      if (error instanceof HttpError) {
        res.status(error.status).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  },

  async getAllContratos(req: Request, res: Response) {
    try {
      const contratos = await ContratoService.getAllContratos();
      res.status(200).json(contratos);
    } catch (error: any) {
      if (error instanceof HttpError) {
        res.status(error.status).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  },

  async getContratoById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const contrato = await ContratoService.getContratoById(id);
      res.status(200).json(contrato);
    } catch (error: any) {
      if (error instanceof HttpError) {
        res.status(error.status).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  },

  async getPagamentosByContratoId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const pagamentos = await ContratoService.getPagamentosByContratoId(id);
      res.status(200).json(pagamentos);
    } catch (error: any) {
      if (error instanceof HttpError) {
        res.status(error.status).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  },

  async deleteContrato(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await ContratoService.deleteContrato(id);
      res.status(204).send();
    } catch (error: any) {
      if (error instanceof HttpError) {
        res.status(error.status).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  },
};

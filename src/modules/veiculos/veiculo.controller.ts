import { Request, Response } from "express";
import { VeiculosService } from "./veiculo.service.js";
import { HttpError } from "../../errors/HttpErrors.js";

export const VeiculosController = {
  async getAllVeiculos(_: Request, res: Response) {
    try {
      const veiculos = await VeiculosService.getAllVeiculos();
      res.status(200).json(veiculos);
    } catch (error: any) {
      if (error instanceof HttpError) {
        res.status(error.status).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  },

  async createVeiculo(req: Request, res: Response) {
    try {
      const veiculo = await VeiculosService.createVeiculo(
        req.body,
        req.user!.id,
        req.file as Express.Multer.File | undefined
      );
      res.status(201).json(veiculo);
    } catch (error: any) {
      if (error instanceof HttpError) {
        res.status(error.status).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  },
};

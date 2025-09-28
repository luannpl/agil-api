import { Request, Response } from "express";
import { VeiculosService } from "./veiculo.service.js";
import { HttpError } from "../../errors/HttpErrors.js";

export const VeiculosController = {
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

  async buscarPorPlaca(req: Request, res: Response) {
    try {
      const { placa } = req.body;
      const veiculo = await VeiculosService.buscarPorPlaca(placa);
      res.status(200).json(veiculo);
    } catch (error: any) {
      if (error instanceof HttpError) {
        res.status(error.status).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  },

  async getAllVeiculos(req: Request, res: Response) {
    try {
      const { cor, marca, valorMax } = req.query;

      const filtros = {
        cor: cor as string | undefined,
        marca: marca as string | undefined,
        valorMax: valorMax ? Number(valorMax) : undefined,
      };

      const veiculos = await VeiculosService.getAllVeiculos(filtros);
      res.status(200).json(veiculos);
    } catch (error: any) {
      if (error instanceof HttpError) {
        res.status(error.status).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  },
  async getVeiculoById(req: Request, res: Response) {
    try {
      const veiculo = await VeiculosService.getVeiculoById(+req.params.id);
      res.status(200).json(veiculo);
    } catch (error: any) {
      if (error instanceof HttpError) {
        res.status(error.status).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  },

  async getDestaques(req: Request, res: Response) {
    try {
      const destaques = await VeiculosService.getDestaques();
      res.status(200).json(destaques);
    } catch (error: any) {
      if (error instanceof HttpError) {
        res.status(error.status).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  },

  async deleteVeiculo(req: Request, res: Response) {
    try {
      await VeiculosService.deleteVeiculo(+req.params.id);
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

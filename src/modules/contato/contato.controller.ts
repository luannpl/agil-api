import { Request, Response } from "express";
import { HttpError } from "../../errors/HttpErrors.js";
import { ContatoService } from "./contato.service.js";

export const ContatoController = {
  async createContato(req: Request, res: Response) {
    try {
      const contato = await ContatoService.createContato(req.body);
      res.status(201).json(contato);
    } catch (error: any) {
      if (error instanceof HttpError) {
        res.status(error.status).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  },

  async getAllContatos(_: Request, res: Response) {
    try {
      const contatos = await ContatoService.getAllContatos();
      res.status(200).json(contatos);
    } catch (error: any) {
      if (error instanceof HttpError) {
        res.status(error.status).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  },
};

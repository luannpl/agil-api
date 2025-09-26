import { Request, Response } from "express";
import { HttpError, UnauthorizedError } from "../../errors/HttpErrors.js";
import { UserService } from "./usuario.service.js";

export const UserController = {
  async createUser(req: Request, res: Response) {
    try {
      const user = await UserService.createUser(req.body);
      res.status(201).json(user);
    } catch (error: any) {
      if (error instanceof HttpError) {
        res.status(error.status).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  },

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users);
    } catch (error: any) {
      if (error instanceof HttpError) {
        res.status(error.status).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  },

  async getMe(req: Request, res: Response) {
    try {
      if (!req.user) {
        throw new UnauthorizedError("Usuário não autenticado");
      }
      const user = await UserService.getMe(req.user.id);
      res.status(200).json(user);
    } catch (error: any) {
      if (error instanceof HttpError) {
        res.status(error.status).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  },

  async getFuncionarios(req: Request, res: Response) {
    try {
      const funcionarios = await UserService.getFuncionarios();
      res.status(200).json(funcionarios);
    } catch (error: any) {
      if (error instanceof HttpError) {
        res.status(error.status).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  },

  async getUserById(req: Request, res: Response) {
    try {
      const user = await UserService.getUserById(req.params.id);
      res.status(200).json(user);
    } catch (error: any) {
      if (error instanceof HttpError) {
        res.status(error.status).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  },

  async updateUser(req: Request, res: Response) {
    try {
      if (!req.user) {
        throw new UnauthorizedError("Usuário não autenticado");
      }
      const user = await UserService.updateUser(req.user.id, req.body);
      res.status(200).json(user);
    } catch (error: any) {
      if (error instanceof HttpError) {
        res.status(error.status).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  },

  async deleteUser(req: Request, res: Response) {
    try {
      await UserService.deleteUser(req.params.id);
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

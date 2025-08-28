import { Request, Response } from "express";
import { HttpError } from "../../errors/HttpErrors.js";
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
};

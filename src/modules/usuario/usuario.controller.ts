import { Request, Response } from "express";
import { HttpError } from "../../errors/HttpErrors";
import { UserService } from "./usuario.service";

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
};

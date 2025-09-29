import { Request, Response } from "express";
import { HttpError } from "../../errors/HttpErrors.js";
import { DashboardService } from "./dashboard.service.js";

export const DashboardController = {
  async getDashboardAdminData(req: Request, res: Response) {
    try {
      const data = await DashboardService.getDashboardAdminData();
      res.status(200).json(data);
    } catch (error: any) {
      if (error instanceof HttpError) {
        res.status(error.status).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  },
};

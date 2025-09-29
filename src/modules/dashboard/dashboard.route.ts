import { Router } from "express";
import { DashboardController } from "./dashboard.controller.js";
import { authenticate } from "../../middlewares/authenticate.js";

export const DashboardRoutes = Router();

DashboardRoutes.get(
  "/admin",
  authenticate,
  DashboardController.getDashboardAdminData
);

import { Router } from "express";
const router = Router();
import { userController } from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/authenticate.js";

router.post("/", userController.register);

router.post("/login", userController.login);

router.use(authenticate);

router.get("/me", userController.me);

router.get("/" , userController.getAllUsers);

export default router;
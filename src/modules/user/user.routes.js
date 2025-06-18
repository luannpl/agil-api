import { Router } from "express";
const router = Router();
import { userController } from "./user.controller.js";
import { authenticate } from "../../middlewares/authenticate.js";

router.use(authenticate);

router.get("/me", userController.me);
router.get("/" , userController.getAllUsers);

router.put("/:id", userController.update);

router.delete("/:id", userController.delete);

export default router;
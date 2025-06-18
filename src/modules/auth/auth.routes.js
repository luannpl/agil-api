import { Router } from "express";
const router = Router();
import { authController } from "./auth.controller.js";
import { validateBody } from "../../middlewares/validateBody.js";
import { LoginSchema, UserSchema } from "./auth.schema.js";

router.post("/register", validateBody(UserSchema), authController.register);
router.post("/login", validateBody(LoginSchema) ,authController.login);

export default router;
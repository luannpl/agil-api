import { Router } from "express";
const router = Router();
import { userController } from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/authenticate.js";
import { validateBody } from "../middlewares/validateBody.js";
import { LoginSchema, UserSchema } from "../schemas/user.schema.js";


router.post("/", validateBody(UserSchema), userController.register);

router.post("/login", validateBody(LoginSchema) ,userController.login);

router.use(authenticate);

router.get("/me", userController.me);

router.get("/" , userController.getAllUsers);

export default router;
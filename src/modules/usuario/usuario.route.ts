import { Router } from "express";
import { validate } from "../../middlewares/validate.js";
import { CreateUserSchema } from "./schemas/createUser.schema.js";
import { UserController } from "./usuario.controller.js";

const router = Router();

router.post("/", validate(CreateUserSchema), UserController.createUser);
router.get("/", UserController.getAllUsers);

export default router;

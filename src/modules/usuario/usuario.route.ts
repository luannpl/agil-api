import { Router } from "express";
import { validate } from "../../middlewares/validate";
import { CreateUserSchema } from "./schemas/createUser.schema";
import { UserController } from "./usuario.controller";

const router = Router();

router.post("/", validate(CreateUserSchema), UserController.createUser);
router.get("/", UserController.getAllUsers);

export default router;

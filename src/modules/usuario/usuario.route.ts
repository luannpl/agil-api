import { Router } from "express";
import { validate } from "../../middlewares/validate";
import { CreateUserSchema } from "./schemas/createUser.schema";
import { UserController } from "./usuario.controller";

const router = Router();

router.post("/", validate(CreateUserSchema), UserController.createUser);
router.get("/", (req, res) => {
  res.send("Rota de usuários funcionando!");
});

export default router;

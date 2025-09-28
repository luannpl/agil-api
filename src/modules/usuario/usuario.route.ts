import { Router } from "express";
import { validate } from "../../middlewares/validate.js";
import { CreateUserSchema } from "./schemas/createUser.schema.js";
import { UserController } from "./usuario.controller.js";
import { authenticate } from "../../middlewares/authenticate.js";
import { UpdateUserSchema } from "./schemas/updateUser.schema.js";
import { ChangePasswordSchema } from "./schemas/changePassword.schema.js";
import { searchCliente } from "./schemas/searchCliente.schema.js";

const router = Router();

router.post(
  "/",
  authenticate,
  validate(CreateUserSchema),
  UserController.createUser
);
router.post(
  "/cliente",
  authenticate,
  validate(searchCliente),
  UserController.searchCliente
);
router.get("/", authenticate, UserController.getAllUsers);
router.get("/me", authenticate, UserController.getMe);
router.get("/funcionarios", UserController.getFuncionarios);
router.get("/:id", authenticate, UserController.getUserById);
router.put(
  "/",
  authenticate,
  validate(UpdateUserSchema),
  UserController.updateUser
);
router.patch(
  "/alterar-senha",
  authenticate,
  validate(ChangePasswordSchema),
  UserController.changePassword
);
router.delete("/:id", authenticate, UserController.deleteUser);

export default router;

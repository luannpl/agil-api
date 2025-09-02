import { Router } from "express";
import { validate } from "../../middlewares/validate.js";
import { CreateUserSchema } from "./schemas/createUser.schema.js";
import { UserController } from "./usuario.controller.js";
import { authenticate } from "../../middlewares/authenticate.js";

const router = Router();

router.post(
  "/",
  authenticate,
  validate(CreateUserSchema),
  UserController.createUser
);
router.get("/", authenticate, UserController.getAllUsers);
router.get("/me", authenticate, UserController.getMe);
router.get("/:id", authenticate, UserController.getUserById);
router.delete("/:id", authenticate, UserController.deleteUser);

export default router;

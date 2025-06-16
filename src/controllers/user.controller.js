import { UserSchema } from "../schemas/user.schema.js";
import { userService } from "../services/user.service.js";

export const userController = {
    async register(req, res) {
        const data = UserSchema.safeParse(req.body);
        if (!data.success) {
            return res.status(400).json({ errors: data.error.errors });
        }
        try {
            const user = await userService.register(data);
            return res.status(201).json({
                message: "User registered successfully",
                user
            });
        }
        catch (error) {
            if (error instanceof HttpError) {
                return res.status(error.status).json({ error: error.message });
            }
            return res.status(500).json({ error: "Erro interno no servidor" });
        }
    },

    async login(req, res) {
        try {
          const response = await userService.login(req.body);
          return res.status(200).json(response);
        } catch (error) {
          console.error(error);
          if (error instanceof HttpError) {
            return res.status(error.status).json({ error: error.message });
          }
          return res.status(500).json({ error: "Erro interno no servidor" });
        }
      },

    async me(req, res) {
        const userId = req.user.id;
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true
            }
        });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json(user);
    },

    async getAllUsers(req, res) {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true
            }
        });
        return res.status(200).json(users);
    }
}
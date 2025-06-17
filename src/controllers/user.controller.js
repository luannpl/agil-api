import { HttpError } from "../errors/HttpErrors.js";
import { userService } from "../services/user.service.js";

export const userController = {
    async register(req, res) {
        try {
            const user = await userService.register(req.body);
            return res.status(201).json({
                message: "User registered successfully",
                user
            });
        }
        catch (error) {
            if (error instanceof HttpError) {
                return res.status(error.status).json({ error: error.message });
            }
            return res.status(500).json({ error: "Internal Server Error" });
        }
    },

    async login(req, res) {
        try {
            const response = await userService.login(req.body);
            return res.status(200).json(response);
        } catch (error) {
            if (error instanceof HttpError) {
                return res.status(error.status).json({ error: error.message });
            }
            return res.status(500).json({ error: "Internal Server Error" });
        }
    },

    async me(req, res) {
        try{
            const user = await userService.me(req.user.id);
            return res.status(200).json(user);
        }catch (error) {
            if (error instanceof HttpError) {
                return res.status(error.status).json({ error: error.message });
            }
            return res.status(500).json({ error: "Internal Server Error" });
        }
    },

    async getAllUsers(req, res) {
        try {
            const users = await userService.getAllUsers();
            return res.status(200).json(users);
        } catch (error) {
            if (error instanceof HttpError) {
                return res.status(error.status).json({ error: error.message });
            }
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
}
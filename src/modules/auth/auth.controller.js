import { HttpError } from "../../errors/HttpErrors.js";
import { authService } from "./auth.service.js";

export const authController = {
    async register(req, res) {
        try {
            const user = await authService.register(req.body);
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
            const response = await authService.login(req.body);
            return res.status(200).json(response);
        } catch (error) {
            if (error instanceof HttpError) {
                return res.status(error.status).json({ error: error.message });
            }
            return res.status(500).json({ error: "Internal Server Error" });
        }
    },
}
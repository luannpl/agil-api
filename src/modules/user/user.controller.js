import { HttpError } from "../../errors/HttpErrors.js";
import { userService } from "./user.service.js";

export const userController = {
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
    },

    async update(req, res){
        try {
            const user = await userService.update(req.params.id, req.body);
            return res.status(200).json(user);
        } catch (error) {
            if (error instanceof HttpError) {
                return res.status(error.status).json({ error: error.message });
            }
            return res.status(500).json({ error: "Internal Server Error" });
        }
    },

    async delete(req, res) {
        try{
            const user = await userService.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            if (error instanceof HttpError) {
                return res.status(error.status).json({ error: error.message });
            }
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
}
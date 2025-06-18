import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { BadRequestError } from "../../errors/HttpErrors.js";
import { userRepository } from "./user.repository.js";
import { hashPassword } from "../../utils/hash.js";

export const userService = {
    

    async me(userId) {
        const user = await userRepository.findById(userId);
        if (!user) {
            throw new BadRequestError("User not found");
        }
        return user;
    },

    async getAllUsers() {
        const users = await userRepository.getAllUsers();
        return users;
    },

    async update(userId, data) {
        const user = await userRepository.findById(userId);
        if (!user) {
            throw new BadRequestError("User not found");
        }
        if (data.password) {
            data.password = await hashPassword(data.password);
        }
        const updatedUser = await userRepository.update(userId, data);
        if (!updatedUser) {
            throw new BadRequestError("Error updating user");
        }
        return updatedUser;
    },

    async delete(userId) {
        const user = await userRepository.findById(userId);
        if (!user) {
            throw new BadRequestError("User not found");
        }
        await userRepository.delete(userId);
        return user;
    }
}
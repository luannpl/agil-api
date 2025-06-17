import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { BadRequestError, UnauthorizedError } from "../errors/HttpErrors.js";
import { userRepository } from "../repositories/user.repository.js";

export const userService = {
    async register(data) {
        const existingUser = await userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new BadRequestError("Email already registered");
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);
        data.password = hashedPassword;
        const user = await userRepository.create(data);
        if (!user) {
            throw new BadRequestError("Error creating user");
        }
        delete user.password;
        return user;
    },

    async login(data) { 
        const user = await userRepository.findByEmail(data.email);
        if (!user) {
            throw new UnauthorizedError("Invalid email or password");
        }
        const isPasswordValid = await bcrypt.compare(data.password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedError("Invalid email or password");
        }
        delete user.password;
        const token = jwt.sign({ id: user.id, email: user.email, name: `${user.firstName} ${user.lastName}` }, process.env.JWT_SECRET, {
            expiresIn: "8h"
        })
        return {
            message: "Login successful",
            token,
            user
        };
    },

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
    }
}
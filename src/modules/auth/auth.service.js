import { BadRequestError, UnauthorizedError } from "../../errors/HttpErrors.js";
import { userRepository } from "../user/user.repository.js";
import { comparePassword, hashPassword } from "../../utils/hash.js";
import { generateToken } from "../../utils/generateToken.js";

export const authService = {
    async register(data) {
        const existingUser = await userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new BadRequestError("Email already registered");
        } 
        data.password = await hashPassword(data.password);
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
        const isPasswordValid = await comparePassword(data.password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedError("Invalid email or password");
        }
        delete user.password;
        const token = generateToken(user);
        return {
            message: "Login successful",
            token,
            user
        };
    },
}
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { BadRequestError, UnauthorizedError } from "../errors/HttpErrors.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const userService = {
    async register(data) {
        const existingUser = await prisma.user.findUnique({
            where: { email: data.data.email }
        });
        if (existingUser) {
            throw new BadRequestError("Email já está em uso");
        }
        const hashedPassword = await bcrypt.hash(data.data.password, 10);
        data.data.password = hashedPassword;

        const user = await prisma.user.create({ data: data.data });
        delete user.password;
        return user;
    },

    async login(data) {
        const user = await prisma.user.findUnique({
            where: { email: data.email },
        })
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
    }
}
import jwt from "jsonwebtoken";
import { BadRequestError } from "../errors/HttpErrors.js";

export const generateToken = (user) => {
    if (!process.env.JWT_SECRET) {
        throw new BadRequestError("JWT_SECRET não definido");
    }
    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {
        expiresIn: "8h"
    });

    return token;
}
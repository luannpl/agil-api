import bcrypt from "bcrypt";
import { BadRequestError } from "../errors/HttpErrors.js";

export const hashPassword = async (password) => {
    if (!password) {
        throw new BadRequestError("Password is required");
    }
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}
export const comparePassword = async (password, hashedPassword) => {
    if (!password || !hashedPassword) {
        throw new BadRequestError("Both password and hashed password are required");
    }
    return await bcrypt.compare(password, hashedPassword);
}
import { Router } from "express";
import { UserSchema } from "../schemas/user.schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { authenticate } from "../middlewares/authenticate.js";


import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

dotenv.config();
const router = Router();

router.post("/", async (req, res) => {
    const data = UserSchema.safeParse(req.body);
    if (!data.success) {
        return res.status(400).json({ errors: data.error.errors });
    }
    const existingUser = await prisma.user.findUnique({
        where: { email: data.data.email }
    });
    if (existingUser) {
        return res.status(400).json({ error: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(data.data.password, 10);
    data.data.password = hashedPassword;
    try{
        const user = await prisma.user.create({data: data.data});
        delete user.password;
        res.status(201).json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }  
})

router.post("/login", async (req, res) =>{
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
        where: { email }
    })
    if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid email or password" });
    }
    delete user.password;
    const token = jwt.sign({id: user.id, email: user.email, name: `${user.firstName} ${user.lastName}`}, process.env.JWT_SECRET, {
        expiresIn: "8h"
    })
    return res.status(200).json({
        message: "Login successful",
        token,
        user
    });
})

router.use(authenticate);

router.get("/me", async (req, res) => {
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
}
);

router.get("/" , async (req, res) => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
        }
    });
    return res.status(200).json(users);
})

export default router;
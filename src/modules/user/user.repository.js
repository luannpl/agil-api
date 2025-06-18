import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const userRepository = {
    async findByEmail(email) {
        return await prisma.user.findUnique({
            where: { email }
        });
    },

    async create(data) {
        return await prisma.user.create({ data });
    },

    async findById(id) {
        return await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true
            }
        });
    },

    async getAllUsers() {
        return await prisma.user.findMany({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true
            }
        });
    },

    async update(id, data) {
        return await prisma.user.update({
            where: { id },
            data
        });
    },

    async delete(id) {
        return await prisma.user.delete({
            where: { id }
        });
    }
}
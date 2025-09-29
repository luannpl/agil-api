import { prisma } from "../../prisma/client.js";

export const VeiculosRepository = {
  async create(data: any) {
    return await prisma.veiculo.create({ data });
  },

  async findAll(filtros: { cor?: string; marca?: string; valorMax?: number }) {
    const where: any = {};

    if (filtros.cor) {
      where.cor = {
        equals: filtros.cor,
        mode: "insensitive",
      };
    }

    if (filtros.marca) {
      where.marca = {
        equals: filtros.marca,
        mode: "insensitive",
      };
    }

    if (filtros.valorMax) {
      where.valor = {
        lte: filtros.valorMax,
      };
    }
    return await prisma.veiculo.findMany({
      where,
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            email: true,
            telefone: true,
            tipo: true,
          },
        },
      },
    });
  },

  async findById(id: number) {
    return await prisma.veiculo.findUnique({
      where: { id },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            email: true,
            telefone: true,
            tipo: true,
          },
        },
      },
    });
  },

  async findDestaques() {
    return await prisma.veiculo.findMany({
      orderBy: [{ valor: "desc" }, { ano: "desc" }],
      take: 4,
    });
  },

  async findByPlaca(placa: string) {
    return await prisma.veiculo.findUnique({
      where: { placa },
    });
  },

  async findByCodigoCRV(codigoCRV: string) {
    return await prisma.veiculo.findUnique({
      where: { codigoCRV },
    });
  },

  async update(id: number, data: any) {
    return await prisma.veiculo.update({
      where: { id },
      data,
    });
  },

  async delete(id: number) {
    return await prisma.veiculo.delete({
      where: { id },
    });
  },
};

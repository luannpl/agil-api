import { prisma } from "../../prisma/client.js";

export const VeiculosRepository = {
  async create(data: any) {
    return await prisma.veiculo.create({ data });
  },

  async createImagens(data: { url: string; veiculoId: number }[]) {
    return await prisma.imagemVeiculo.createMany({ data });
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
        imagens: {
          select: {
            id: true,
            url: true,
          },
        },
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
        imagens: {
          select: {
            id: true,
            url: true,
          },
        },
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
      include: {
        imagens: {
          select: {
            id: true,
            url: true,
          },
        },
      },
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
    await prisma.imagemVeiculo.deleteMany({
      where: { veiculoId: id },
    });
    return await prisma.veiculo.delete({
      where: { id },
    });
  },

  async totalVeiculosEstoque() {
    return await prisma.veiculo.count({ where: { vendido: false } });
  },

  async totalEstoqueEmValor() {
    const result = await prisma.veiculo.aggregate({
      _sum: {
        valor: true,
      },
      where: { vendido: false },
    });
    return result._sum.valor || 0;
  },

  async marcasMaisVendidas() {
    const result = await prisma.veiculo.groupBy({
      by: ["marca"],
      _count: {
        marca: true,
      },
      where: { vendido: true },
      orderBy: {
        _count: {
          marca: "desc",
        },
      },
      take: 5,
    });

    return result.map((item) => ({
      marca: item.marca,
      totalVendidos: item._count.marca,
    }));
  },
};

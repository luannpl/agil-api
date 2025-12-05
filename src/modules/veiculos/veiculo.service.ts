import { VeiculosRepository } from "./veiculo.repository.js";
import { CreateVeiculoDto } from "./dto/createVeiculo.dto.js";
import { ConflictError, NotFoundError } from "../../errors/HttpErrors.js";
import { deleteFile, uploadFile } from "../../lib/r2Storage.js";
import { ContratoRepository } from "../contratos/contrato.repository.js";

export const VeiculosService = {
  async createVeiculo(
    veiculoData: CreateVeiculoDto,
    usuarioId: string,
    files?: Express.Multer.File[]
  ) {
    const existingVeiculo = await VeiculosRepository.findByPlaca(
      veiculoData.placa
    );
    if (existingVeiculo) {
      throw new ConflictError("Placa já cadastrada");
    }

    if (veiculoData.codigoCRV) {
      const existingCodigoCRV = await VeiculosRepository.findByCodigoCRV(
        veiculoData.codigoCRV
      );
      if (existingCodigoCRV) {
        throw new ConflictError("Codigo CRV já cadastrado");
      }
    }

    const veiculo = await VeiculosRepository.create({
      ...veiculoData,
      usuarioId,
    });

    if (files && files.length > 0) {
      const imagens = await Promise.all(
        files.map(async (file) => {
          const newFileName = `${veiculoData.placa}-${file.originalname}`;
          const url = await uploadFile(
            "veiculos",
            newFileName,
            file.buffer,
            file.mimetype
          );
          return { url, veiculoId: veiculo.id };
        })
      );
      await VeiculosRepository.createImagens(imagens);
    }

    return veiculo;
  },

  async buscarPorPlaca(placa: string) {
    const veiculo = await VeiculosRepository.findByPlaca(placa);
    if (!veiculo) {
      throw new NotFoundError("Veículo não encontrado");
    }
    return veiculo;
  },

  async getAllVeiculos(filtros: {
    cor?: string;
    marca?: string;
    valorMax?: number;
  }) {
    const veiculos = await VeiculosRepository.findAll(filtros);
    return veiculos;
  },

  async getVeiculoById(id: number) {
    const veiculo = await VeiculosRepository.findById(id);
    if (!veiculo) {
      throw new NotFoundError("Veículo não encontrado");
    }
    return veiculo;
  },

  async getDestaques() {
    const destaques = await VeiculosRepository.findDestaques();
    return destaques;
  },

  async updateVeiculo(id: number, data: Partial<CreateVeiculoDto>) {
    const veiculo = await VeiculosRepository.findById(id);
    if (!veiculo) {
      throw new NotFoundError("Veículo não encontrado");
    }
    if (data.placa && data.placa !== veiculo.placa) {
      const existingVeiculo = await VeiculosRepository.findByPlaca(data.placa);
      if (existingVeiculo) {
        throw new ConflictError("Placa já cadastrada");
      }
    }
    if (data.codigoCRV && data.codigoCRV !== veiculo.codigoCRV) {
      const existingCodigoCRV = await VeiculosRepository.findByCodigoCRV(
        data.codigoCRV
      );
      if (existingCodigoCRV) {
        throw new ConflictError("Codigo CRV já cadastrado");
      }
    }
    const updatedVeiculo = await VeiculosRepository.update(id, data);
    return updatedVeiculo;
  },

  async deleteVeiculo(id: number) {
    const veiculo = await VeiculosRepository.findById(id);
    if (!veiculo) {
      throw new NotFoundError("Veículo não encontrado");
    }

    const contratos = await ContratoRepository.findByVeiculoId(id);
    if (contratos.length > 0) {
      throw new ConflictError(
        "Este veículo está associado a um ou mais contratos e não pode ser excluído."
      );
    }

    if (veiculo.imagens && veiculo.imagens.length > 0) {
      await Promise.all(
        veiculo.imagens.map(async (imagem) => {
          await deleteFile("veiculos", imagem.url);
        })
      );
    }
    await VeiculosRepository.delete(id);
  },

  async totalVeiculosEstoque() {
    const total = await VeiculosRepository.totalVeiculosEstoque();
    return total;
  },

  async totalEstoqueEmValor() {
    const total = await VeiculosRepository.totalEstoqueEmValor();
    return total;
  },

  async marcasMaisVendidas() {
    return await VeiculosRepository.marcasMaisVendidas();
  },

  async getEstoqueMetrics() {
    const { totalVeiculosEstoque, totalEstoqueEmValor } =
      await VeiculosRepository.getEstoqueMetrics();
    return { totalVeiculosEstoque, totalEstoqueEmValor };
  },
};

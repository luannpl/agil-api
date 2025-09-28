import { VeiculosRepository } from "./veiculo.repository.js";
import { CreateVeiculoDto } from "./dto/createVeiculo.dto.js";
import { ConflictError, NotFoundError } from "../../errors/HttpErrors.js";
import { deleteFile, uploadFile } from "../../lib/supabaseStorage.js";

export const VeiculosService = {
  async createVeiculo(
    veiculoData: CreateVeiculoDto,
    usuarioId: string,
    file?: Express.Multer.File
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

    if (file) {
      const newFileName = `${veiculoData.placa}-${file.originalname}`;
      veiculoData.imagem = await uploadFile(
        "veiculos",
        newFileName,
        file.buffer,
        file.mimetype
      );
    }
    const veiculo = await VeiculosRepository.create({
      ...veiculoData,
      usuarioId,
    });
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

  async deleteVeiculo(id: number) {
    const veiculo = await VeiculosRepository.findById(id);
    if (!veiculo) {
      throw new NotFoundError("Veículo não encontrado");
    }
    if (veiculo.imagem && veiculo.imagem !== "Sem imagem") {
      const fileUrl = veiculo.imagem;
      const filePath = fileUrl.split("/veiculos/")[1];

      await deleteFile("veiculos", filePath);
    }
    await VeiculosRepository.delete(id);
  },
};

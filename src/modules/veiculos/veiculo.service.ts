import { VeiculosRepository } from "./veiculo.repository";
import { CreateVeiculoDto } from "./dto/createVeiculo.dto";
import { supabase } from "../../lib/supabase";
import { BadRequestError, ConflictError } from "../../errors/HttpErrors";

export const VeiculosService = {
  async getAllVeiculos() {
    const veiculos = await VeiculosRepository.findAll();
    return veiculos;
  },

  async createVeiculo(
    veiculoData: CreateVeiculoDto,
    file?: Express.Multer.File
  ) {
    const existingVeiculo = await VeiculosRepository.findByPlaca(
      veiculoData.placa
    );
    if (existingVeiculo) {
      throw new ConflictError("Veículo já cadastrado");
    }
    veiculoData.imagem = "Sem imagem";
    if (file) {
      const filePath = `veiculos/${veiculoData.placa}-${file.originalname}`;
      const { data, error: uploadError } = await supabase.storage
        .from("veiculos")
        .upload(filePath, file.buffer, {
          contentType: file.mimetype,
          upsert: true,
        });
      if (uploadError) {
        throw new BadRequestError("Error uploading veiculos");
      }
      veiculoData.imagem = `https://vxkqmhgtbqvffwbgzxyq.supabase.co/storage/v1/object/public/veiculos/${filePath}`;
    }
    const veiculo = await VeiculosRepository.create(veiculoData);
    return veiculo;
  },
};

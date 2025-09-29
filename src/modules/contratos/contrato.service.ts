import { BadRequestError } from "../../errors/HttpErrors.js";
import { UserService } from "../usuario/usuario.service.js";
import { VeiculosService } from "../veiculos/veiculo.service.js";
import { ContratoRepository } from "./contrato.repository.js";
import { CreateContratoDto } from "./dto/createContrato.dto.js";

export const ContratoService = {
  async createContrato(data: CreateContratoDto) {
    const user = await UserService.getUserById(data.usuarioId);
    const veiculo = await VeiculosService.getVeiculoById(data.veiculoId);
    const contrato = await ContratoRepository.create(data);
    if (contrato) {
      await VeiculosService.updateVeiculo(veiculo.id, { vendido: true });
    }
    return contrato;
  },

  async getAllContratos() {
    const contratos = await ContratoRepository.getAllContratos();
    return contratos;
  },

  async getContratoById(id: string) {
    const contrato = await ContratoRepository.findById(id);
    if (!contrato) {
      throw new BadRequestError("Contrato não encontrado");
    }
    return contrato;
  },

  async deleteContrato(id: string) {
    const contrato = await ContratoRepository.findById(id);
    if (!contrato) {
      throw new BadRequestError("Contrato não encontrado");
    }

    await ContratoRepository.delete(id);
    await VeiculosService.updateVeiculo(contrato.veiculoId, { vendido: false });

    return contrato;
  },
};

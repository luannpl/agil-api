import { UserService } from "../usuario/usuario.service.js";
import { VeiculosService } from "../veiculos/veiculo.service.js";
import { ContratoRepository } from "./contrato.repository.js";
import { CreateContratoDto } from "./dto/createContrato.dto.js";

export const ContratoService = {
  async createContrato(data: CreateContratoDto) {
    const user = await UserService.getUserById(data.usuarioId);
    const veiculo = await VeiculosService.getVeiculoById(data.veiculoId);
    const contrato = await ContratoRepository.create(data);
    return contrato;
  },

  async getAllContratos() {
    const contratos = await ContratoRepository.getAllContratos();
    return contratos;
  },
};

import { StatusPagamento } from "@prisma/client";
import { BadRequestError } from "../../errors/HttpErrors.js";
import { prisma } from "../../prisma/client.js";
import { UserService } from "../usuario/usuario.service.js";
import { VeiculosService } from "../veiculos/veiculo.service.js";
import { ContratoRepository } from "./contrato.repository.js";
import { CreateContratoDto } from "./dto/createContrato.dto.js";
import addMonthsAndHandleLastDay from "../../utils/verificaUltimoDiaDoMes.js";


export const ContratoService = {
  async createContrato(data: CreateContratoDto) {
  const usuario = await UserService.getUserById(data.usuarioId);
  const veiculo = await VeiculosService.getVeiculoById(data.veiculoId);

  const contrato = await prisma.$transaction(async (tx) => {
    const novoContrato = await tx.contrato.create({ data });

    await tx.veiculo.update({
      where: { id: data.veiculoId },
      data: { vendido: true },
    });

    const dataContrato = novoContrato.createdAt;

    const pagamentosData = [];
    for (let i = 1; i <= novoContrato.totalParcelas; i++) {
      const dataVencimento = addMonthsAndHandleLastDay(dataContrato, i);
      pagamentosData.push({
        valorParcela: novoContrato.valorParcela,
        numeroParcela: i,
        dataVencimento: dataVencimento,
        status: StatusPagamento.PENDENTE,
        contratoId: novoContrato.id,
      });
    }

    await tx.pagamento.createMany({
      data: pagamentosData,
    });

    return novoContrato;
  });

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

  async getPagamentosByContratoId(id: string) {
    const contrato = await ContratoRepository.findById(id);
    if (!contrato) {
      throw new BadRequestError("Contrato não encontrado");
    }
    const pagamentos = await prisma.pagamento.findMany({
      where: { contratoId: id },
      orderBy: { numeroParcela: 'asc' }
    });

    return pagamentos;
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

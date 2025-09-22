import { Combustivel, Sistema, TipoVeiculo } from "@prisma/client";
import z from "zod";

export const CreateVeiculoSchema = z.object({
  nome: z
    .string({
      required_error: "Nome é obrigatório",
    })
    .min(1, "Nome é obrigatório"),

  descricao: z
    .string({
      required_error: "Descrição é obrigatória",
    })
    .min(1, "Descrição deve ter no mínimo 1 caracteres"),

  marca: z
    .string({
      required_error: "Marca é obrigatória",
    })
    .min(1, "Marca deve ter no mínimo 1 caracteres"),

  ano: z.coerce
    .number({
      required_error: "Ano é obrigatório",
    })
    .min(1886, "Ano deve ser maior ou igual a 1886"),
  placa: z
    .string({
      required_error: "Placa é obrigatória",
    })
    .min(1, "Placa deve ter no mínimo 1 caracteres"),
  valor: z.coerce
    .number({
      required_error: "Valor é obrigatório",
    })
    .min(0, "Valor deve ser maior ou igual a 0"),
  cor: z
    .string({
      required_error: "Cor é obrigatória",
    })
    .min(1, "Cor deve ter no mínimo 1 caracteres"),
  quilometragem: z.coerce
    .number({
      required_error: "Quilometragem é obrigatória",
    })
    .min(0, "Quilometragem deve ser maior ou igual a 0"),
  vendido: z.coerce
    .boolean({
      required_error: "Vendido é obrigatório",
    })
    .default(false),
  tipo: z.nativeEnum(TipoVeiculo, {
    required_error: "Tipo de veículo é obrigatório",
    invalid_type_error: "Tipo de veículo inválido",
  }),
  sistema: z.nativeEnum(Sistema, {
    required_error: "Sistema é obrigatório",
    invalid_type_error: "Sistema inválido",
  }),
  combustivel: z.nativeEnum(Combustivel, {
    required_error: "Combustível é obrigatório",
    invalid_type_error: "Combustível inválido",
  }),
  localizacao: z.string().optional(),
  imagem: z.string().optional(),
  codigoCRV: z.string().optional(),
  seguro: z.coerce.boolean().default(false),
  rastreador: z.coerce.boolean().default(false),
  transferido: z.coerce.boolean().default(false),
  regularizado: z.coerce.boolean().default(false),
  valorEntrada: z.coerce.number().optional(),
  valorVenda: z.coerce.number().optional(),
  infoAdicionais: z.string().optional(),
});

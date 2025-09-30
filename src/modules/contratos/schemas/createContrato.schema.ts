import z from "zod";

export const CreateContratoSchema = z.object({
  banco: z
    .string({
      required_error: "O campo banco é obrigatório",
    })
    .min(2)
    .max(100),
  valorTotalFinanciamento: z.coerce
    .number({
      required_error: "O campo valorTotalFinanciamento é obrigatório",
    })
    .min(0),
  dataPagamento: z.coerce.date({
    required_error: "O campo dataPagamento é obrigatório",
  }),
  valorParcela: z.coerce
    .number({
      required_error: "O campo valorParcela é obrigatório",
    })
    .min(0),
  parcelaAtual: z.coerce
    .number({
      required_error: "O campo parcelaAtual é obrigatório",
    })
    .min(1),
  totalParcelas: z.coerce
    .number({
      required_error: "O campo totalParcelas é obrigatório",
    })
    .min(1),
  status: z
    .string({
      required_error: "O campo status é obrigatório",
    })
    .min(2)
    .max(100),
  valorFinalEntrada: z.coerce
    .number({
      required_error: "O campo valorFinalEntrada é obrigatório",
    })
    .min(0),
  descricaoEntrada: z.coerce
    .string({
      required_error: "O campo descricaoEntrada é obrigatório",
    })
    .min(2)
    .max(255),
  sinal: z.string().optional(),
  usuarioId: z
    .string({
      required_error: "O campo usuarioId é obrigatório",
    })
    .uuid(),
  veiculoId: z.coerce
    .number({
      required_error: "O campo veiculoId é obrigatório",
    })
    .min(1),
});

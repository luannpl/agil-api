-- CreateTable
CREATE TABLE "public"."agil_contratos" (
    "id" TEXT NOT NULL,
    "banco" TEXT NOT NULL,
    "valorTotalFinanciamento" DOUBLE PRECISION NOT NULL,
    "dataPagamento" TIMESTAMP(3) NOT NULL,
    "valorParcela" DOUBLE PRECISION NOT NULL,
    "parcelaAtual" INTEGER NOT NULL,
    "totalParcelas" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "valorFinalEntrada" DOUBLE PRECISION NOT NULL,
    "descricaoEntrada" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "veiculoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "agil_contratos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "agil_contratos_veiculoId_key" ON "public"."agil_contratos"("veiculoId");

-- AddForeignKey
ALTER TABLE "public"."agil_contratos" ADD CONSTRAINT "agil_contratos_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."agil_usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."agil_contratos" ADD CONSTRAINT "agil_contratos_veiculoId_fkey" FOREIGN KEY ("veiculoId") REFERENCES "public"."agil_veiculos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

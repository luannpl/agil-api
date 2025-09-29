-- CreateEnum
CREATE TYPE "public"."StatusPagamento" AS ENUM ('PENDENTE', 'PAGO', 'ATRASADO');

-- CreateTable
CREATE TABLE "public"."agil_pagamentos" (
    "id" TEXT NOT NULL,
    "valorParcela" DOUBLE PRECISION NOT NULL,
    "numeroParcela" INTEGER NOT NULL,
    "dataVencimento" TIMESTAMP(3) NOT NULL,
    "status" "public"."StatusPagamento" NOT NULL DEFAULT 'PENDENTE',
    "contratoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "agil_pagamentos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."agil_pagamentos" ADD CONSTRAINT "agil_pagamentos_contratoId_fkey" FOREIGN KEY ("contratoId") REFERENCES "public"."agil_contratos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

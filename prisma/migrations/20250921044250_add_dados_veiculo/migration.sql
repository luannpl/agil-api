/*
  Warnings:

  - A unique constraint covering the columns `[codigoCRV]` on the table `agil_veiculos` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."agil_veiculos" ADD COLUMN     "codigoCRV" TEXT,
ADD COLUMN     "infoAdicionais" TEXT,
ADD COLUMN     "rastreador" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "regularizado" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "seguro" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "transferido" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "valorEntrada" DOUBLE PRECISION,
ADD COLUMN     "valorVenda" DOUBLE PRECISION;

-- CreateIndex
CREATE UNIQUE INDEX "agil_veiculos_codigoCRV_key" ON "public"."agil_veiculos"("codigoCRV");

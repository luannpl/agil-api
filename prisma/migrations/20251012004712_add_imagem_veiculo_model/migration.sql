/*
  Warnings:

  - You are about to drop the column `imagem` on the `agil_veiculos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."agil_veiculos" DROP COLUMN "imagem";

-- CreateTable
CREATE TABLE "public"."agil_imagem_veiculos" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "veiculoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "agil_imagem_veiculos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."agil_imagem_veiculos" ADD CONSTRAINT "agil_imagem_veiculos_veiculoId_fkey" FOREIGN KEY ("veiculoId") REFERENCES "public"."agil_veiculos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

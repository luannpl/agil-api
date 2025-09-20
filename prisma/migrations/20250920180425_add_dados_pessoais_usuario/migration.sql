/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `agil_usuarios` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[rg]` on the table `agil_usuarios` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cnh]` on the table `agil_usuarios` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."agil_usuarios" ADD COLUMN     "cep" TEXT,
ADD COLUMN     "cnh" TEXT,
ADD COLUMN     "complemento" TEXT,
ADD COLUMN     "cpf" TEXT,
ADD COLUMN     "dataNasc" TIMESTAMP(3),
ADD COLUMN     "descricao" TEXT,
ADD COLUMN     "endereco" TEXT,
ADD COLUMN     "numero" TEXT,
ADD COLUMN     "rg" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "agil_usuarios_cpf_key" ON "public"."agil_usuarios"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "agil_usuarios_rg_key" ON "public"."agil_usuarios"("rg");

-- CreateIndex
CREATE UNIQUE INDEX "agil_usuarios_cnh_key" ON "public"."agil_usuarios"("cnh");

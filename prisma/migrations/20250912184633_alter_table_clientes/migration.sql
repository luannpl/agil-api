/*
  Warnings:

  - Made the column `cep` on table `agil_clientes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `endereco` on table `agil_clientes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `descricao` on table `agil_clientes` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."agil_clientes" ALTER COLUMN "cep" SET NOT NULL,
ALTER COLUMN "endereco" SET NOT NULL,
ALTER COLUMN "descricao" SET NOT NULL;

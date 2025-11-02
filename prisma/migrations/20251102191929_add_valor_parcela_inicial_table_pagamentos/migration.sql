/*
  Warnings:

  - Added the required column `valorParcelaInicial` to the `agil_pagamentos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."agil_pagamentos" ADD COLUMN     "valorParcelaInicial" DOUBLE PRECISION NOT NULL;

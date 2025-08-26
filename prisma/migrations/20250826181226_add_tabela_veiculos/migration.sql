-- CreateEnum
CREATE TYPE "public"."TipoVeiculo" AS ENUM ('carro', 'moto', 'caminhao', 'onibus', 'bicicleta', 'outros');

-- CreateEnum
CREATE TYPE "public"."Sistema" AS ENUM ('manual', 'automatico', 'semi_automatico', 'cvt', 'carburador', 'injetado');

-- CreateTable
CREATE TABLE "public"."agil_veiculos" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "ano" INTEGER NOT NULL,
    "placa" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "cor" TEXT NOT NULL,
    "quilometragem" INTEGER NOT NULL,
    "tipo" "public"."TipoVeiculo" NOT NULL,
    "sistema" "public"."Sistema" NOT NULL,
    "imagem" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "agil_veiculos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "agil_veiculos_placa_key" ON "public"."agil_veiculos"("placa");

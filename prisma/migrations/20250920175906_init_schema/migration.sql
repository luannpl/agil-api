-- CreateEnum
CREATE TYPE "public"."TipoUsuario" AS ENUM ('admin', 'cliente', 'despachante', 'vendedor');

-- CreateEnum
CREATE TYPE "public"."TipoVeiculo" AS ENUM ('carro', 'moto', 'caminhao', 'onibus', 'bicicleta', 'outros');

-- CreateEnum
CREATE TYPE "public"."Sistema" AS ENUM ('manual', 'automatico', 'semi_automatico', 'cvt', 'carburador', 'injetado');

-- CreateEnum
CREATE TYPE "public"."Combustivel" AS ENUM ('gasolina', 'alcool', 'diesel', 'flex', 'hibrido', 'elétrico');

-- CreateTable
CREATE TABLE "public"."agil_usuarios" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "tipo" "public"."TipoUsuario" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "telefone" TEXT,

    CONSTRAINT "agil_usuarios_pkey" PRIMARY KEY ("id")
);

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
    "usuarioId" TEXT,
    "vendido" BOOLEAN NOT NULL DEFAULT false,
    "combustivel" "public"."Combustivel" DEFAULT 'gasolina',
    "localizacao" TEXT DEFAULT 'Fortaleza',

    CONSTRAINT "agil_veiculos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."agil_contatos" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT,
    "mensagem" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lida" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "agil_contatos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "agil_usuarios_email_key" ON "public"."agil_usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "agil_veiculos_placa_key" ON "public"."agil_veiculos"("placa");

-- AddForeignKey
ALTER TABLE "public"."agil_veiculos" ADD CONSTRAINT "agil_veiculos_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."agil_usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

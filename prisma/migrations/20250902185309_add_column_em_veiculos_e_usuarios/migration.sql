-- CreateEnum
CREATE TYPE "public"."Combustivel" AS ENUM ('gasolina', 'alcool', 'diesel', 'elétrico', 'flex', 'hibrido');

-- AlterTable
ALTER TABLE "public"."agil_usuarios" ADD COLUMN     "telefone" TEXT;

-- AlterTable
ALTER TABLE "public"."agil_veiculos" ADD COLUMN     "combustivel" "public"."Combustivel" DEFAULT 'gasolina',
ADD COLUMN     "localizacao" TEXT DEFAULT 'Fortaleza';

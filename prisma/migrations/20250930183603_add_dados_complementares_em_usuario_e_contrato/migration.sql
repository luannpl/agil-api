-- AlterTable
ALTER TABLE "public"."agil_contratos" ADD COLUMN     "sinal" TEXT NOT NULL DEFAULT 'Sem sinal';

-- AlterTable
ALTER TABLE "public"."agil_usuarios" ADD COLUMN     "bairro" TEXT,
ADD COLUMN     "cidade" TEXT,
ADD COLUMN     "estado" TEXT,
ADD COLUMN     "estadoCivil" TEXT,
ADD COLUMN     "nacionalidade" TEXT,
ADD COLUMN     "profissao" TEXT;

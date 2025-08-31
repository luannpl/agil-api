-- AlterTable
ALTER TABLE "public"."agil_veiculos" ADD COLUMN     "usuarioId" TEXT,
ADD COLUMN     "vendido" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "public"."agil_veiculos" ADD CONSTRAINT "agil_veiculos_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."agil_usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

/*
  Warnings:

  - The primary key for the `agil_usuarios` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "public"."agil_usuarios" DROP CONSTRAINT "agil_usuarios_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "agil_usuarios_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "agil_usuarios_id_seq";

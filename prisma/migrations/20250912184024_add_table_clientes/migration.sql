-- CreateTable
CREATE TABLE "public"."agil_clientes" (
    "id" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "rg" TEXT,
    "cnh" TEXT,
    "cep" TEXT,
    "endereco" TEXT,
    "descricao" TEXT,
    "usuarioId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "agil_clientes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "agil_clientes_cpf_key" ON "public"."agil_clientes"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "agil_clientes_rg_key" ON "public"."agil_clientes"("rg");

-- CreateIndex
CREATE UNIQUE INDEX "agil_clientes_cnh_key" ON "public"."agil_clientes"("cnh");

-- CreateIndex
CREATE UNIQUE INDEX "agil_clientes_usuarioId_key" ON "public"."agil_clientes"("usuarioId");

-- AddForeignKey
ALTER TABLE "public"."agil_clientes" ADD CONSTRAINT "agil_clientes_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."agil_usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

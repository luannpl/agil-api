-- DropForeignKey
ALTER TABLE "public"."agil_pagamentos" DROP CONSTRAINT "agil_pagamentos_contratoId_fkey";

-- AddForeignKey
ALTER TABLE "public"."agil_pagamentos" ADD CONSTRAINT "agil_pagamentos_contratoId_fkey" FOREIGN KEY ("contratoId") REFERENCES "public"."agil_contratos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

import { ContratoService } from "../contratos/contrato.service.js";
import { UserService } from "../usuario/usuario.service.js";
import { VeiculosService } from "../veiculos/veiculo.service.js";

export const DashboardService = {
  async getDashboardAdminData() {
    const [
      totalVeiculosEstoque,
      totalEstoqueEmValor,
      totalClientes,
      totalContratosMes,
      ultimasVendas,
      marcasMaisVendidas,
    ] = await Promise.all([
      VeiculosService.totalVeiculosEstoque(),
      VeiculosService.totalEstoqueEmValor(),
      UserService.totalClientes(),
      ContratoService.totalContratosMes(),
      ContratoService.ultimasVendas(),
      VeiculosService.marcasMaisVendidas(),
    ]);

    return {
      totalVeiculosEstoque,
      totalEstoqueEmValor,
      totalClientes,
      totalContratosMes,
      ultimasVendas,
      marcasMaisVendidas,
    };
  },
};

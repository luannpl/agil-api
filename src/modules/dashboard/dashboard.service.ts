import { ContratoService } from "../contratos/contrato.service.js";
import { UserService } from "../usuario/usuario.service.js";
import { VeiculosService } from "../veiculos/veiculo.service.js";

export const DashboardService = {
  async getDashboardAdminData() {
    const { totalVeiculosEstoque, totalEstoqueEmValor } =
      await VeiculosService.getEstoqueMetrics();
    const totalClientes = await UserService.totalClientes();
    const { totalContratosMes, ultimasVendas } =
      await ContratoService.getContratoMetrics();
    const marcasMaisVendidas = await VeiculosService.marcasMaisVendidas();

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

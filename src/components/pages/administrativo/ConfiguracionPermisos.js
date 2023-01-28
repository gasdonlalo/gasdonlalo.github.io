import HeaderComponents from "../../../GUI/HeaderComponents";
import IconComponents from "../../assets/IconComponents";
import FormConfiguracionPermisos from "../../forms/FormConfiguracionPermisos";

function ConfiguracionPermisos() {
  return (
    <div className="main">
      <HeaderComponents
        urlBack="../"
        textUrlback="Volver a Administración"
        title="Configuración de Permisos"
      >
        <IconComponents
          icon="chart-line text-danger"
          text="Reporte cuadro"
          url="/administrativo/rep-permisos"
        />
      </HeaderComponents>

      <div>
        <FormConfiguracionPermisos />
      </div>
    </div>
  );
}

export default ConfiguracionPermisos;

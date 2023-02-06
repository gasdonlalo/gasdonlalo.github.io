import HeaderComponents from "../../../GUI/HeaderComponents";
import IconComponents from "../../assets/IconComponents";
import FormConfiguracionEstacion from "../../forms/FormConfiguracionEstacion";

function ConfiguracionEstacion() {
  return (
    <div className="Main">
      <HeaderComponents
        urlBack="../"
        textUrlback="Volver a Administración"
        title="Configuración de Estación "
      >
        <IconComponents
          icon="chart-line text-danger"
          text="Reporte cuadro"
          url="/administrativo/rep-estacion"
        />
      </HeaderComponents>

      <div>
        <FormConfiguracionEstacion />
      </div>
    </div>
  );
}

export default ConfiguracionEstacion;

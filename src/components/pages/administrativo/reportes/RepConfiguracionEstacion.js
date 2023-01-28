import HeaderComponents from "../../../../GUI/HeaderComponents";
import IconComponents from "../../../assets/IconComponents";

function RepConfiguracionEstacion() {
  return (
    <div className="Main">
      <HeaderComponents
        urlBack="../"
        textUrlback="Volver a Administración"
        title="Reporte de configuracion de estación"
      >
        <IconComponents
          text="Configuración Est"
          url="/administrativo/configuracion-estacion"
          icon="fa-thin fa-clipboard-list text-primary"
        />
      </HeaderComponents>
      <div>
        <h1>Holam</h1>
      </div>
    </div>
  );
}

export default RepConfiguracionEstacion;

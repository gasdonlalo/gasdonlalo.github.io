import HeaderComponents from "../../../../GUI/HeaderComponents";
import IconComponents from "../../../assets/IconComponents";

function RepConfiguracionPermisos() {
  return (
    <div className="Main">
      <HeaderComponents
        textUrlback="Volver a administrativo"
        urlBack="../"
        title="Reporte Configuracion de Permisos"
      >
        <IconComponents
          url="/administrativo/configuracion-permisos"
          text="Configuracion Permisos"
          icon="fa-thin fa-clipboard-list text-primary"
        />
      </HeaderComponents>
      <div>
        <h3>Holam</h3>
      </div>
    </div>
  );
}

export default RepConfiguracionPermisos;

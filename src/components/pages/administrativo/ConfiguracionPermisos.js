import HeaderComponents from "../../../GUI/HeaderComponents";
import IconComponents from "../../assets/IconComponents";
import FormConfiguracionPermisos from "../../forms/FormConfiguracionPermisos";

function ConfiguracionPermisos() {
  return (
    <div className="Main">
      <HeaderComponents
        urlBack="../"
        textUrlback="Volver a Administración"
        title="Configuración de Permisos"
      >
        <IconComponents
          icon="user text-danger"
          text="Usuarios"
          url="../configuracion-usuario"
        />
      </HeaderComponents>

      <div>
        <FormConfiguracionPermisos />
      </div>
    </div>
  );
}

export default ConfiguracionPermisos;

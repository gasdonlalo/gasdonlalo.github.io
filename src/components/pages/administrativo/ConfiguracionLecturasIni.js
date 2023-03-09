import HeaderComponents from "../../../GUI/HeaderComponents";
import IconComponents from "../../assets/IconComponents";
import FormLecturaInicial from "../../../components/forms/FormLecturaInicial";

function ConfiguracionLecturasIni() {
  return (
    <div className="Main">
      <HeaderComponents
        urlBack="/"
        textUrlback="Volver a Administración"
        title="Configuración de Lecturas Iniciales"
      ></HeaderComponents>
      <div>
        <FormLecturaInicial />
      </div>
    </div>
  );
}

export default ConfiguracionLecturasIni;

import { Fragment } from "react";
import HeaderComponents from "../../../GUI/HeaderComponents";
import IconComponents from "../../assets/IconComponents";
import FormRecursosDesp from "../../forms/FormRecursosDesp";
function RecursosDesp() {
  return (
    <Fragment>
      <div className="Main">
        <HeaderComponents
          urlBack="/recursos-humanos"
          textUrlback="Volver a recursos humanos"
          title="Recursos de Despachador"
        >
          <IconComponents
            icon="chart-line text-danger"
            text="Reportes"
            url="/recursos-humanos/recurso-despachador/reporte"
          ></IconComponents>
        </HeaderComponents>
        <FormRecursosDesp />
      </div>
    </Fragment>
  );
}

export default RecursosDesp;

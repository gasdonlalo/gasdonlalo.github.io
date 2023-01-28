import { Fragment } from "react";
import HeaderComponents from "../../../GUI/HeaderComponents";
import IconComponents from "../../assets/IconComponents";
import FormRecursosDesp from "../../forms/FormRecursosDesp";
function RecursosDesp() {
  return (
    <Fragment>
      <div className="Main">
        <HeaderComponents
          urlBack="/despacho"
          textUrlback="Volver al Despacho"
          title="Recursos de Despachador"
        >
          <IconComponents
            icon="chart-line text-danger"
            text="Reportes"
            url="/despacho/recurso-despachador/reporte"
          ></IconComponents>
        </HeaderComponents>
        <FormRecursosDesp />
      </div>
    </Fragment>
  );
}

export default RecursosDesp;

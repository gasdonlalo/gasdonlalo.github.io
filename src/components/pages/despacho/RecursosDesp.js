import { Fragment } from "react";
import { Link } from "react-router-dom";
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
            text="Grafica RD"
            url="/despacho/recurso-despachador/reporte"
          ></IconComponents>
        </HeaderComponents>
        <FormRecursosDesp />
      </div>
    </Fragment>
  );
}

export default RecursosDesp;

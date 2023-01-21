import HeaderComponents from "../../../GUI/HeaderComponents";
import IconComponents from "../../assets/IconComponents";
import FormRecoleccion from "../../forms/FormRecoleccion";

function RecolEfect() {
  return (
    <div className="Main">
      <div>
        <HeaderComponents
          title="Recolección de efectivo"
          urlBack="/despacho"
          textUrlback="Regresar a despacho"
        >
          <IconComponents
            icon="chart-simple text-danger"
            url="/despacho/recoleccion-efectivo/reporte"
            text="Reportes"
          />
        </HeaderComponents>
        <FormRecoleccion />
      </div>
    </div>
  );
}

export default RecolEfect;

import HeaderComponents from "../../../GUI/HeaderComponents";
import IconComponents from "../../assets/IconComponents";
import FormOrdenIsla from "../../forms/FormOrdenIsla";

function OrdenIsla() {
  return (
    <div className="Main">
      <HeaderComponents
        urlBack="/despacho"
        textUrlback="Volver a Despacho"
        title="Orden y Limpiza de Isla"
      >
        <div>
          <IconComponents
            icon="chart-simple text-danger"
            text="Reportes"
            url="reporte"
          />
        </div>
      </HeaderComponents>

      <FormOrdenIsla />
    </div>
  );
}

export default OrdenIsla;

import HeaderComponents from "../../../GUI/HeaderComponents";
import IconComponents from "../../assets/IconComponents";
import FormUniforme from "../../forms/FormUniforme";

function EvalUniforme() {
  return (
    <div className="Main">
      <div>
        <HeaderComponents
          title="Registro de Evaluaciones de uniforme"
          urlBack="/despacho"
          textUrlback="Regresar a despacho"
        >
          <div className="d-flex">
            <IconComponents
              icon="chart-simple text-danger"
              url="../evaluacion-uniforme/reporte"
              text="Reportes"
            />
          </div>
        </HeaderComponents>
        <FormUniforme />
      </div>
    </div>
  );
}
export default EvalUniforme;

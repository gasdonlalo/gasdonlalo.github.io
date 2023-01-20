import HeaderComponents from "../../../GUI/HeaderComponents";
import FormUniforme from "../../forms/FormUniforme";
import IconComponents from "../../assets/IconComponents";

function EvalUniforme() {
  return (
    <div className="Main">
      <div>
        <HeaderComponents
          urlBack="/despacho"
          textUrlback="Regresar a despacho"
          title="Evaluación uniforme a despachador"
        >
          <IconComponents
            icon="chart-simple text-danger"
            url="/despacho/evaluacion-uniforme-reporte"
            text="Reportes"
          />
        </HeaderComponents>
        <p style={{ background: "#dadada" }} className="rounded">
          <em>
            Solo ser permiten dos evaluaciones por despachador, entre la primera
            y segunda quincena de cada mes
          </em>
        </p>
        <FormUniforme />
      </div>
    </div>
  );
}
export default EvalUniforme;

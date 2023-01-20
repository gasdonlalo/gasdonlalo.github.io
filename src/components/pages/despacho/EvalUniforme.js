import { Link } from "react-router-dom";
import FormUniforme from "../../forms/FormUniforme";

function EvalUniforme() {
  return (
    <div className="Main">
      <div>
        <Link className="link-primary" to="/despacho">
          Volver al despacho
        </Link>
        <h4 className="border-bottom">Evaluación de uniforme</h4>
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

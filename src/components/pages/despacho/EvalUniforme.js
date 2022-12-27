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
        <FormUniforme />
      </div>
    </div>
  );
}
export default EvalUniforme;

import { Fragment } from "react";
import { Link } from "react-router-dom";
import FormRecursosDesp from "../../forms/FormRecursosDesp";
function RecursosDesp() {
  return (
    <Fragment>
      <div className="Main">
        <div>
          <Link className="link-primary" to="/despacho">
            Volver al despacho
          </Link>
          <h4 className="border-bottom">Evaluación de recursos despachador</h4>
          <FormRecursosDesp />
        </div>
      </div>
    </Fragment>
  );
}

export default RecursosDesp;

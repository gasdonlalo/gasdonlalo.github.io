import { Fragment } from "react";
import { Link } from "react-router-dom";

function Despacho() {
  return (
    <Fragment>
      <div className="Captura">
        <h3>Captura de datos</h3>
        <div className="d-flex justify-content-evenly">
          <Link
            type="button"
            className="btn btn-primary"
            to="/montos-faltantes"
          >
            Monto faltante
          </Link>
          <Link type="button" className="btn btn-primary" to="/checklist">
            Checklist de bombas
          </Link>
        </div>
      </div>
      <div className="Graph">
        <h3>Graficas</h3>
        <div className="d-flex justify-content-evenly">
          <Link
            type="button"
            className="btn btn-primary disabled"
            to="/montos-faltantes"
          >
            Grafica monto faltante
          </Link>
          <Link type="button" className="btn btn-primary disabled" to="">
            Grafica mensual registro checklist
          </Link>
        </div>
      </div>
    </Fragment>
  );
}
export default Despacho;

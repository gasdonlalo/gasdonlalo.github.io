import { Fragment } from "react";
import { Link } from "react-router-dom";

function Despacho() {
  return (
    <Fragment>
      <Link type="button" className="btn btn-primary" to="/montos-faltantes">
        Montos Faltantes
      </Link>
      <Link type="button" className="btn btn-primary" to="">
        Checklist de bombas
      </Link>
    </Fragment>
  );
}
export default Despacho;

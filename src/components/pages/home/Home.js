import { Fragment } from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Fragment>
      <Link type="button" className="btn btn-primary" to="/despacho">
        Despacho
      </Link>
      <Link type="button" className="btn btn-primary" to="">
        Mantenimiento
      </Link>
    </Fragment>
  );
}
export default Home;

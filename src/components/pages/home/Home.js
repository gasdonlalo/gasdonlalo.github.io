import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "../../../Caxios/Axios";

function Home() {
  const [datos, setDatos] = useState(null);

  const extraerEmpleado = async () => {
    const empleado = await Axios.get("/empleado");
    setDatos(empleado.data.response);
    /* console.log(empleado.data.response) */
  };

  /*   extraerEmpleado();
   */
  useEffect(() => {
    extraerEmpleado();
  }, []);

  /*   Axios.get("/empleado").then(function (response) {
    console.log(response);
  }); */

  return (
    <Fragment>
      <Link type="button" className="btn btn-primary" to="/despacho">
        Despacho
      </Link>
      <Link type="button" className="btn btn-primary" to="">
        Mantenimiento
      </Link>
      {datos && console.log(datos)}
    </Fragment>
  );
}
export default Home;

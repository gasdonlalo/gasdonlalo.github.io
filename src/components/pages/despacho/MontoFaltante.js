import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import FormMontoFalt from "../../forms/FormMontoFalt";
import Axios from "../../../Caxios/Axios";
function MontoFaltante() {
  const [data, setData] = useState([]);
  //recibe los datos del formulario
  const handle = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  const enviar = (e) => {
    e.preventDefault();
    enviarDatos();
    console.log(data);
  };
  //añadir ruta
  const enviarDatos = async () => {
    const resp = await Axios.post("/monto-faltante-despachador", data);
    console.log(resp);
    if (resp.status === 200) {
      window.alert("correcto");
    } else {
      window.alert("Incorrecto");
    }
    console.log(resp);
  };

  return (
    <Fragment>
      <div className="Main">
        <div>
          <Link className="link-primary" to="/despacho">
            Volver al despacho
          </Link>
          <h4 className="border-bottom">Insertar Montos faltantes</h4>
          <FormMontoFalt handle={handle} enviar={enviar} />
        </div>
      </div>
    </Fragment>
  );
}
export default MontoFaltante;

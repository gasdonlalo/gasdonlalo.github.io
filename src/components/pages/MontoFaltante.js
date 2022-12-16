import { useState } from "react";
import { Link } from "react-router-dom";
import FormMontoFalt from "../../components/forms/FormMontoFalt";
import Axios from "../../Caxios/Axios";
function MontoFaltante() {
  const [data, setData] = useState([]);
  //recibe los datos del formulario
  const handle = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };
  //añadir ruta
  const enviarDatos = async () => {
    const resp = await Axios.post("/", data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    console.log(resp);
  };

  const enviar = () => {
    enviarDatos();
  };
  return (
    <div className="ContentMain">
      <div className="Main">
        <div className="m-4">
          <Link className="link-primary" to="/despacho">
            Volver al despacho
          </Link>
          <h4>Insertar Montos faltantes</h4>
          <FormMontoFalt handle={handle} enviar={enviar} />
        </div>
      </div>
    </div>
  );
}
export default MontoFaltante;

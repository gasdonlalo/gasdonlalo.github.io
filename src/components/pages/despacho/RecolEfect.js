import { Link } from "react-router-dom";
import FormRecoleccion from "../../forms/FormRecoleccion";
import useGetData from "../../../hooks/useGetData";
import Axios from "../../../Caxios/Axios";
import { useState } from "react";

function RecolEfect() {
  //consulta de empleados
  const empleados = useGetData("/empleado?departamento=1");

  const [data, setData] = useState([]);
  //recibe los datos del formulario
  const handle = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const enviar = (e) => {
    e.preventDefault();
    enviarDatos(data);
    console.log(data);
  };

  const enviarDatos = async (x) => {
    const resp = await Axios.post("/recoleccion-efectivo/", x);

    if (resp.status === 200) {
      window.alert("correcto");
    } else {
      window.alert("Incorrecto");
    }
  };

  return (
    <div className="Main">
      <div>
        <Link className="link-primary" to="/despacho">
          Volver al despacho
        </Link>
        <h4 className="border-bottom">Recoleccion de efectivo</h4>
        <FormRecoleccion datos={empleados} enviar={enviar} handle={handle} />
      </div>
    </div>
  );
}

export default RecolEfect;

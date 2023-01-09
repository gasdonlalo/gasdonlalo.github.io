import { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "../../../Caxios/Axios";
import useGetData from "../../../hooks/useGetData";
import FormDocumentos from "../../forms/FormDocumentos";

function Documentos() {

  const [data, setData] = useState([]);

  const handle = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  //para poder obtener todos los empleados de todos los departamentos
  const empleados = useGetData("/empleado?departamento");

  const enviar = (e) => {
    e.preventDefault();
    enviarDatos();
    console.log(data);
  }

  const enviarDatos = async () => {
    const resp = await Axios.post("/control-documento", data);
    console.log(resp);
    if (resp.status === 200) {
      window.alert("correcto");
    } else {
      window.alert("incorrecto");
    }
    console.log(resp)
  }

  return (
    <div className="Main">
      <div>
        <Link className="Link-primary" to="/recursos-humanos">Volver a recursos humanos</Link>
      </div>
      <h4 className="border-bottom">Documentos de trabajo</h4>
      <FormDocumentos enviar={enviar} datos={empleados } />
    </div>
  )
}

export default Documentos;
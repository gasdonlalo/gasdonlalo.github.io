import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "../../../Caxios/Axios";
import FormRecursosDesp from "../../forms/FormRecursosDesp";
import useGetData from "../../../hooks/useGetData";
function RecursosDesp() {
  //consulta de empleados
  const empleados = useGetData("/empleado?departamento=1");
  const pasos = useGetData("/lista-recurso-despachador/get-recurso");

  const [data, setData] = useState([]);
  //const [evalua, setEvalua] = useState([]);
  //recibe los datos del formulario
  const handle = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const puntos = (e) => {
    setData({
      ...data,
      [e.target.name]: [e.target.value],
      [e.target.id]: e.target.id,
    });
  };

  const enviar = (e) => {
    e.preventDefault();
    //enviarDatos();
    console.log(data);
    //console.log(evalua);
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
          <h4 className="border-bottom">Evaluación de recursos despachador</h4>
          <FormRecursosDesp
            datos={empleados}
            handle={handle}
            enviar={enviar}
            pasos={pasos}
            puntos={puntos}
          />
        </div>
      </div>
    </Fragment>
  );
}

export default RecursosDesp;

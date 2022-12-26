import { Link } from "react-router-dom";
import Axios from "../../../Caxios/Axios";
import { useState } from "react";
import useGetData from "../../../hooks/useGetData";
import FormDespachar from "../../forms/FormDespachar";
function Pasosdespachar() {
  //consulta de empleados
  const empleados = useGetData("/empleado?departamento=1");
  const pasos = useGetData("/pasos-despachar/get-pasos");

  const [data, setData] = useState({ pasos: [] });

  //recibe los datos del formulario
  const handle = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleEval = (e) => {
    let evalua = data.pasos.filter((el) => el.idPaso !== e.target.name);
    evalua.push({ idPaso: e.target.name, evaluacion: Number(e.target.value) });
    console.log(evalua);
    setData({ ...data, pasos: evalua });
  };
  const enviar = (e) => {
    e.preventDefault();
    enviarDatos(data);
    console.log(data);
  };

  const enviarDatos = async (x) => {
    const resp = await Axios.post("/pasos-despachar", x);
    console.log(resp);
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
        <h4 className="border-bottom">Evaluacion de pasos para despachar</h4>
        <FormDespachar
          datos={empleados}
          enviar={enviar}
          handle={handle}
          handleEval={handleEval}
          pasos={pasos}
        />
      </div>
    </div>
  );
}

export default Pasosdespachar;

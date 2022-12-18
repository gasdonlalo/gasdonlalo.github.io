import { useState } from "react";
import { Link } from "react-router-dom";
import FormUniforme from "../../forms/FormUniforme";
import Uniforme from "../../Uniforme.json";

function EvalUniforme() {
  const [data, setData] = useState([]);

  const handle = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    //console.log(data);
  };

  const puntos = (e) => {
    setData({ ...data, [e.target.id]: [e.target.name, e.target.value] });
  };

  const enviar = async (e) => {
    e.preventDefault();
    //enviarDatos();
    console.log(data);
  };

  return (
    <div className="Main">
      <div>
        <Link className="link-primary" to="/despacho">
          Volver al despacho
        </Link>
        <h4 className="border-bottom">Evaluación de uniforme</h4>
        <FormUniforme
          handle={handle}
          enviar={enviar}
          uniforme={Uniforme}
          puntos={puntos}
        />
      </div>
    </div>
  );
}
export default EvalUniforme;

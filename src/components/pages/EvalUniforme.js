import { useState } from "react";
import { Link } from "react-router-dom";
import FormUniforme from "../forms/FormUniforme";

function EvalUniforme() {
  const [data, setData] = useState([]);

  const handle = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    //console.log(data);
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
        <h4>Evaluación de uniforme</h4>
        <FormUniforme handle={handle} enviar={enviar} />
      </div>
    </div>
  );
}
export default EvalUniforme;

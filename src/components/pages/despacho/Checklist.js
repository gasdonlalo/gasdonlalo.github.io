import { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "../../../Caxios/Axios";
import FormChecklist from "../../forms/FormChecklist";

function Checklist() {
  const [data, setData] = useState([]);

  const handle = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    //console.log(data);
  };

  const enviar = async (e) => {
    e.preventDefault();
    enviarDatos();
    console.log(data);
  };

  const enviarDatos = async () => {
    const req = await Axios.post("/bomba-check", data);
    console.log(req.status);
    if (req.status === 200) {
      window.alert("Correcto");
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
        <h4 className="border-bottom">Checklist de bombas</h4>
        <FormChecklist handle={handle} enviar={enviar} />
      </div>
    </div>
  );
}
export default Checklist;

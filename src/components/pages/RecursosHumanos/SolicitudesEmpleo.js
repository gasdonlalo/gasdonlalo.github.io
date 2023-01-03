import { useState } from "react";
import FormSolEmpleo from "../../forms/FormSolEmpleo";

function SolicitudesEmpleo() {
  const [datos, setDatos] = useState([]);

  const handle = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
    console.log(datos);
  };
  return (
    <div>
      ola
      <div>
        <FormSolEmpleo handle={handle} data={datos} setData={setDatos} />
      </div>
    </div>
  );
}

export default SolicitudesEmpleo;

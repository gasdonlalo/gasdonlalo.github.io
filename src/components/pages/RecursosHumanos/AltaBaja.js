import { useState } from "react";
import { Link } from "react-router-dom";
import TablaEmpleados from "./TablaEmpleados";

function AltaBaja() {
  const [id, setId] = useState(null);
  console.log(id);
  return (
    <div className="Main">
      <div>
        <Link className="Link-primary" to="/recursos-humanos">
        Volver a recursos humanos
        </Link>
        <h4 className="border-bottom">Altas y bajas de Empleados</h4>
      </div>
      <div className="container">
        <form>
          <label className="form-label">Seleccionar tipo de empleado</label>
          <select
            className="form-control"
            onChange={(e) => setId(e.target.value)}
          >
            <option value={null}>--Selecciona un opcion--</option>
            <option value="1">Contratado</option>
            <option value="2">Practicante</option>
          </select>
        </form>
        <div>
          <TablaEmpleados id={id} />
        </div>
      </div>
    </div>
  );
}

export default AltaBaja;

import TablaEmpleados from "../../tablas/TablaEmpleados";
import { Link } from "react-router-dom";
import { useState } from "react";

function EmpleadosRechazados() {
  const [id, setId] = useState(null);
  return (
    <div className="Main">
      <div>
        <Link className="Link-primary" to="/recursos-humanos">
          Volver a recursos humanos
        </Link>
        <h4 className="border-bottom">Empleados dados de baja</h4>
      </div>
      <div className="container">
        <form>
          <label className="form-label">Seleccionar tipo de empleado</label>
          <select
            className="form-control"
            onChange={(e) => setId(e.target.value)}
          >
            <option value="0">--Selecciona un opcion--</option>
            <option value="3">Despedido/dado de baja</option>
            <option value="4">Rechazado</option>
          </select>
        </form>
        <TablaEmpleados id={id} />
      </div>
    </div>
  );
}

export default EmpleadosRechazados;

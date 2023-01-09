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
        <h4 className="border-bottom">
          Empleados dados de baja / Solicitudes rechazadas
        </h4>
      </div>
      <div className="container">
        <form>
          <label className="form-label">
            Seleccionar tipo de empleado/solicitud
          </label>
          <select
            className="form-control"
            onChange={(e) => setId(e.target.value)}
          >
            <option value=" ">--Selecciona un opcion--</option>
            <option value="3">Despedido/dado de baja</option>
            <option value="4">Rechazado</option>
          </select>
          {id === "3" ? (
            <h4 className="border-bottom mt-2 fst-italic">
              Mostrando empleados despedidos/dados de baja.
            </h4>
          ) : id === "4" ? (
            <h4 className="border-bottom mt-2 fst-italic">
              Mostrando solicitudes rechazadas.
            </h4>
          ) : null}
        </form>
        <TablaEmpleados id={id} />
      </div>
    </div>
  );
}

export default EmpleadosRechazados;

import { useState } from "react";
import { Link } from "react-router-dom";
import TablaEmpleados from "../../tablas/TablaEmpleados";

function AltaBaja() {
  const [id, setId] = useState(null);
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
            <option value=" ">--Selecciona un opcion--</option>
            <option value="1">Contratado</option>
            <option value="5">Pendiente</option>
          </select>
        </form>
        {id === "1" ? (
          <h4 className="border-bottom mt-2 fst-italic">
            Mostrando empleados contratados.
          </h4>
        ) : id === "2" ? (
          <h4 className="border-bottom mt-2 fst-italic">
            Mostrando empleados practicantes.
          </h4>
        ) : id === "5" ? (
          <h4 className="border-bottom mt-2 fst-italic">
            Mostrando solicitudes pendientes.
          </h4>
        ) : (
          <h4 className="mt-2 fst-italic">Selecciona un tipo de empleado...</h4>
        )}
        <div>
          <TablaEmpleados id={id} />
        </div>
      </div>
    </div>
  );
}

export default AltaBaja;

import { useState } from "react";
import HeaderComponents from "../../../GUI/HeaderComponents";
import TablaEmpleados from "../../tablas/TablaEmpleados";
import IconComponents from "../../assets/IconComponents";

function AltaBaja() {
  const [id, setId] = useState(null);
  return (
    <div className="Main">
      <HeaderComponents
        urlBack="/recursos-humanos"
        textUrlback="Volver a recursos humanos"
        title="Altas y bajas de empleados"
      >
        <IconComponents
          url="/recursos-humanos/empleados-dados-baja"
          text="Ver bajas/rechazos"
          icon="fa-thin  fa-arrows-down-to-people"
        />
      </HeaderComponents>
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

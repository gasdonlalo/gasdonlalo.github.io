import { useState } from "react";
import HeaderComponents from "../../../GUI/HeaderComponents";
import TablaEmpleados from "../../tablas/TablaEmpleados";
import IconComponents from "../../assets/IconComponents";

function AltaBaja() {
  const [id, setId] = useState("1");
  return (
    <div className="Main">
      <HeaderComponents
        urlBack="/recursos-humanos"
        textUrlback="Volver a recursos humanos"
        title="Control de empleados"
      >
        <IconComponents
          url="/recursos-humanos/captura-solicitud"
          text="Nueva solicitud"
          icon="address-book text-info"
        />
      </HeaderComponents>
      <div className="container">
        <form>
          <label className="form-label">Seleccionar solicitudes</label>
          <select
            className="form-control"
            onChange={(e) => setId(e.target.value)}
          >
            <option value="1">Contratado</option>
            <option value="2">Practicantes</option>
            <option value="5">Pendiente</option>
            <option value="3">Inactivos</option>
            <option value="4">Rechazados</option>
          </select>
        </form>
        {id === "1" && (
          <h4 className="border-bottom mt-2 fst-italic">
            Mostrando empleados contratados.
          </h4>
        )}
        {id === "2" && (
          <h4 className="border-bottom mt-2 fst-italic">
            Mostrando empleados practicantes.
          </h4>
        )}
        {id === "5" && (
          <h4 className="border-bottom mt-2 fst-italic">
            Mostrando solicitudes pendientes.
          </h4>
        )}
        {id === "4" && (
          <h4 className="border-bottom mt-2 fst-italic">
            Mostrando solicitudes rechazadas.
          </h4>
        )}
        {id === "3" && (
          <h4 className="border-bottom mt-2 fst-italic">
            Mostrando empleados dados de baja.
          </h4>
        )}
        <div>
          <TablaEmpleados id={id} />
        </div>
      </div>
    </div>
  );
}

export default AltaBaja;

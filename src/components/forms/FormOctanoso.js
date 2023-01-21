import useGetData from "../../hooks/useGetData";
import InputFecha from "./InputFecha";
import Loader from "../assets/Loader";
import { useLocation } from "react-router-dom";
import HeaderForm from "../../GUI/HeaderForm";

function FormOctanoso({
  enviar,
  handle,
  data,
  setData,
  pendiente,
  handleSwitch,
}) {
  const ruta = useLocation().pathname;
  console.log(ruta);
  const empleado = useGetData("/empleado?departamento=1");
  const estaciones = useGetData("/estaciones-servicio");
  console.log(pendiente);

  return (
    <div className="container w-50 shadow mt-3">
      <HeaderForm />
      <form onSubmit={enviar}>
        <div className="row pt-3">
          <div className="mb-3 col-4">
            <label>Empleado:</label>
            <select
              className="form-control"
              name="idEmpleado"
              onChange={handle}
              required
            >
              <option>--Selecciona un empleado--</option>
              {!empleado.data
                ? false
                : empleado.data.response.map((e) => {
                    return (
                      <option
                        value={e.idempleado}
                        key={e.idempleado}
                      >{`${e.nombre} ${e.apellido_paterno} ${e.apellido_materno}`}</option>
                    );
                  })}
            </select>
          </div>
          <div className="mb-3 col-4">
            <label>Fecha</label>
            <InputFecha
              handle={handle}
              name="fecha"
              data={data}
              setData={setData}
            />
          </div>
          <div className="mb-3 col-4">
            <label>Estacion de servicio</label>
            <select
              className="form-control"
              name="idEstacionServicio"
              onChange={handle}
              required
            >
              <option value=" "> --Selecciona una estación--</option>
              {!estaciones.data
                ? false
                : estaciones.data.response.map((e) => {
                    return (
                      <option
                        value={e.idestacion_servicio}
                        key={e.idestacion_servicio}
                      >
                        {e.nombre}
                      </option>
                    );
                  })}
            </select>
          </div>
        </div>
        <div className="mb-3">
          <label>
            {ruta.match("aceitoso")
              ? "Pesos vendidos en aceite"
              : "Litros vendidos"}
          </label>
          <input
            className="form-control "
            type="number"
            min="0"
            step="0.01"
            name="litrosVendidos"
            onChange={handle}
            required
          />
        </div>

        <div className="form-check form-switch mb-3">
          <label className="form-check-label fst-italic bg-secondary bg-opacity-50 rounded-pill">
            ***Marcar en SOLO en caso de incumplimiento.
          </label>
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            onClick={handleSwitch}
            tabIndex="on"
          />
        </div>

        <button type=" submit" className="btn btn-primary mb-3">
          {pendiente ? <Loader size="1.5" /> : "Añadir"}
        </button>
      </form>
    </div>
  );
}

export default FormOctanoso;

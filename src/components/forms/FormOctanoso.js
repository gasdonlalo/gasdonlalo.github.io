import useGetData from "../../hooks/useGetData";
import InputFechaC from "./Controlado/InputFechaC";
import Loader from "../assets/Loader";
import { useLocation } from "react-router-dom";
import HeaderForm from "../../GUI/HeaderForm";
import InputSelectEmpleado from "./InputSelectEmpleado";

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
      {!empleado.error &&
        !empleado.isPending &&
        !estaciones.error &&
        !estaciones.isPending && (
          <Success
            handle={handle}
            handleSwitch={handleSwitch}
            pendiente={pendiente}
            estaciones={estaciones}
            ruta={ruta}
            data={data}
            setData={setData}
            empleado={empleado}
            enviar={enviar}
          />
        )}
    </div>
  );
}
const Success = ({
  handle,
  handleSwitch,
  pendiente,
  estaciones,
  ruta,
  data,
  setData,
  empleado,
  enviar,
}) => {
  return (
    <>
      <HeaderForm />
      <form onSubmit={enviar}>
        <div className="row pt-3">
          <div className="mb-3 col-4">
            <label>Empleado:</label>

            <InputSelectEmpleado
              empleados={empleado.data.response}
              handle={handle}
              name="idEmpleado"
              reset={data.hasOwnProperty("idEmpleado")}
            />
          </div>
          <div className="mb-3 col-4">
            <label>Fecha</label>
            <InputFechaC handle={handle} name="fecha" value={data} />
          </div>
          <div className="mb-3 col-4">
            <label>Estacion de servicio</label>
            <select
              className="form-control"
              name="idEstacionServicio"
              onChange={handle}
              required
            >
              <option value=""> --Selecciona una estación--</option>
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
    </>
  );
};
export default FormOctanoso;

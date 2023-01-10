import useGetData from "../../hooks/useGetData";
import InputFecha from "./InputFecha";
import Loader from "../assets/Loader";

function FormOctanoso({ enviar, handle, data, setData, pendiente }) {
  const empleado = useGetData("/empleado?departamento=1");
  const estaciones = useGetData("/estaciones-servicio");
  console.log(pendiente);

  return (
    <div className="container w-75 shadow">
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
          <label>Monto</label>
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
        <button type=" submit" className="btn btn-primary mb-3">
          {pendiente ? <Loader size="1.5" /> : "Añadir"}
        </button>
      </form>
    </div>
  );
}

export default FormOctanoso;

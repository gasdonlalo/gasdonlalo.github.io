import useGetData from "../../hooks/useGetData";
import HeaderForm from "../../GUI/HeaderForm";
import InputSelectEmpleado from "./InputSelectEmpleado";
import InputFechaC from "./Controlado/InputFechaC";
import format from "../assets/format";

const FormBuscarDetallesTiempo = ({ bodyState, buscarDatos, msgError }) => {
  const [body, setBody] = bodyState;
  const { data, error, isPending } = useGetData(`/empleado?departamento=1`);
  const handle = (e) => setBody({ ...body, [e.target.name]: e.target.value });

  const buscar = async (e) => {
    e.preventDefault();
    await buscarDatos();
  };

  return (
    <div className="mt-2">
      <form className="shadow p-2 w-50 mx-auto rounded" onSubmit={buscar}>
        <HeaderForm title="Buscar datos" />
        <div className="row">
          <div className="col-10 mx-auto mb-3">
            <label className="form-label mb-0">Despachador</label>
            {!error && !isPending && (
              <InputSelectEmpleado
                empleados={data.response}
                handle={handle}
                name="idEmpleado"
              />
            )}
          </div>
          <div className="col-10 mx-auto d-flex justify-content-between">
            <div className="col-5">
              <label className="form-label mb-0">Inicio</label>
              <input
                type="date"
                className="form-control"
                name="fechaInicio"
                onChange={handle}
                min="2020-12-12"
                max={format.formatFechaDB(
                  new Date().setDate(new Date().getDate() - 1)
                )}
                required
              />
            </div>
            <div className="col-5">
              <label className="form-label mb-0">Fin</label>
              <InputFechaC
                name="fechaFinal"
                handle={handle}
                min={
                  body
                    ? new Date(
                        new Date(body.fechaInicio || null).setDate(
                          new Date(body.fechaInicio || null).getDate() + 1
                        )
                      )
                        .toISOString()
                        .split("T")[0]
                    : "2020-01-01"
                }
                value={body}
              />
            </div>
          </div>
        </div>
        <div className="mt-4">
          <button className="btn btn-success mx-auto d-block">Buscar</button>
          {msgError && <p className="text-center text-danger">{msgError}</p>}
        </div>
      </form>
    </div>
  );
};

export default FormBuscarDetallesTiempo;

import useGetData from "../../hooks/useGetData";
import HeaderForm from "../../GUI/HeaderForm";
import InputSelectEmpleado from "./InputSelectEmpleado";

const FormBuscarDetallesTiempo = ({ bodyState, buscarDatos }) => {
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
                required
              />
            </div>
            <div className="col-5">
              <label className="form-label mb-0">Fin</label>
              <input
                type="date"
                className="form-control"
                name="fechaFinal"
                onChange={handle}
                required
              />
            </div>
          </div>
        </div>
        <div className="mt-4">
          <button className="btn btn-success mx-auto d-block">Buscar</button>
        </div>
      </form>
    </div>
  );
};

export default FormBuscarDetallesTiempo;

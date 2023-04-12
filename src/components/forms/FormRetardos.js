import Loader from "../assets/Loader";
import InputSelectDep from "./InputSelectDep";
import HeaderForm from "../../GUI/HeaderForm";
import InputFechaC from "./Controlado/InputFechaC";
import InputSelectEmp from "./Controlado/InputSelectEmp";

function FormRetardos({
  changeDep,
  enviar,
  body,
  handle,
  formPending,
  empEstado,
}) {
  const [empleados] = empEstado;

  return (
    <div>
      <form onSubmit={enviar} className="shadow p-2 w-50 m-auto mt-2">
        <HeaderForm />
        <div className="row mb-3">
          <div className="col-4">
            <label className="form-label mb-0">fecha</label>
            <InputFechaC handle={handle} name="fecha" value={body} required />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-6 mb-3">
            <label>Departamentos</label>
            <InputSelectDep handle={changeDep} value={body.idDepartamento} />
          </div>
          <div className="col-6 mb-3">
            <label>Empleados</label>
            {empleados ? (
              <InputSelectEmp
                value={body}
                handle={handle}
                name="idEmpleado"
                empleados={empleados}
                clearable
              />
            ) : (
              <div className="form-select text-danger">
                Primero selecciona un departamento
              </div>
            )}
          </div>
          <div className="col-6 mb-3">
            <label className="form-label mb-0">Hora establecida</label>
            <input
              type="time"
              className="form-control"
              onChange={handle}
              name="horaEstablecida"
              value={body.horaEstablecida}
              required
            />
          </div>
          <div className="col-6 mb-3">
            <label className="form-label mb-0">Hora de entrada</label>
            <input
              type="time"
              className="form-control"
              onChange={handle}
              name="horaEntrada"
              value={body.horaEntrada}
              required
            />
          </div>
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="btn btn-primary mx-auto d-block"
            disabled={formPending}
          >
            {formPending ? <Loader size="1.5" /> : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormRetardos;

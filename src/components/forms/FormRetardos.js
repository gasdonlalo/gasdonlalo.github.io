import Loader from "../assets/Loader";
import InputSelectDep from "./InputSelectDep";
import HeaderForm from "../../GUI/HeaderForm";
import InputFechaC from "./Controlado/InputFechaC";
import InputSelectEmp from "./Controlado/InputSelectEmp";

function FormRetardos({
  changeDep,
  enviar,
  turnos,
  body,
  setBody,
  handle,
  formPending,
  empEstado,
  defaultData,
}) {
  const [empleados] = empEstado;

  const turno = (e) => {
    let tur = turnos.data.response.filter(
      (el) => el.idturno === Number(e.target.value)
    );
    setBody({ ...body, hora_anticipo: tur[0].hora_anticipo });
  };

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
              /* <InputSelectEmpleado
                empleados={empleados}
                name="idEmpleado"
                handle={handle}
                defaultData={defaultData}
                reset={body}
              /> */
              <InputSelectEmp
                value={body}
                handle={handle}
                name="idEmpleado"
                empleados={empleados}
              />
            ) : (
              <div className="form-select text-danger">
                Primero selecciona un departamento
              </div>
            )}
          </div>
          {/* <div className="col-4 mb-3">
            <label className="form-label mb-0">Turno</label>
            <select
              name="idTurno"
              className="form-select"
              defaultValue={1}
              onChange={(handle, turno)}
              required
            >
              {!turnos.error && !turnos.isPending && (
                <option value=""> -- Seleccionar turno -- </option>
              )}
              {turnos.isPending && (
                <option value=""> -- Cargando turnos -- </option>
              )}
              {!turnos.error &&
                !turnos.isPending &&
                turnos.data.response.map((el) => (
                  <option key={el.idturno} value={el.idturno}>
                    {el.turno}
                  </option>
                ))}
              {turnos.isPending && <option value="">Cargando turnos</option>}
              {turnos.error && !turnos.isPending && <option value=""></option>}
            </select>
          </div> */}
          <div className="col-4 mb-3">
            <label className="form-label mb-0">Hora permitida</label>
            <input
              type="time"
              className="form-control"
              onChange={handle}
              name="horaAnticipo"
              value={body.hora_anticipo}
              //disabled
              required
            />
            {/* <select className="form-select" disabled>
              <option value="">{body.hora_anticipo}</option>
            </select> */}
          </div>
          <div className="col-4 mb-3">
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

import { useState, useRef } from "react";
import useGetData from "../../hooks/useGetData";
import Loader from "../assets/Loader";
import InputFecha from "./InputFecha";
import InputSelectDep from "./InputSelectDep";
import HeaderForm from "../../GUI/HeaderForm";
import InputSelectEmpleado from "./InputSelectEmpleado";

function FormRetardos({
  emp,
  enviar,
  turnos,
  body,
  setBody,
  handle,
  formPending,
}) {
  const [showHoraEntradaOpcional, setHoraEntradaOpcional] = useState(false);
  const [empleados, setEmpleados] = useState(null);
  const changeDep = (e) => {
    const filEmp = emp.data.response.filter(
      (emp) => emp.iddepartamento === Number(e.target.value)
    );
    setEmpleados(filEmp);
  };
  // const handleCheckSwitch = (e) => setHoraEntradaOpcional(e.target.checked);
  const InputHora = useRef();

  if (body) {
    if (body.hasOwnProperty("idTipoFalta")) {
      if (
        body.idTipoFalta === "2" ||
        body.idTipoFalta === "3" ||
        body.idTipoFalta === "4"
      ) {
        InputHora.current.disabled = true;
        InputHora.current.value = null;
      } else {
        InputHora.current.disabled = false;
      }
    }
  }

  return (
    <div>
      <form onSubmit={enviar} className="shadow p-2 w-50 m-auto mt-2">
        <HeaderForm />
        <div className="row mb-3">
          <div className="col-4">
            <label className="form-label mb-0">fecha</label>
            <InputFecha
              data={body}
              setData={setBody}
              handle={handle}
              name="fecha"
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-6 mb-3">
            <label>Departamentos</label>
            <InputSelectDep handle={changeDep} />
          </div>
          <div className="col-6 mb-3">
            <label>Empleados</label>
            {empleados ? (
              <InputSelectEmpleado
                empleados={empleados}
                name="idEmpleado"
                handle={handle}
                reset={body}
              />
            ) : (
              <div className="form-select">Selecciona un departameto</div>
            )}
          </div>
          <div className="col-6 mb-3">
            <label className="form-label mb-0">Turno</label>
            <select
              name="idTurno"
              className="form-select"
              defaultValue={1}
              onChange={handle}
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
          </div>
          <div className="col-6 mb-3">
            <label className="form-label mb-0">Hora entrada</label>
            <input
              type="time"
              className="form-control"
              onChange={handle}
              name="horaEntrada"
              ref={InputHora}
              required
            />
          </div>
          <div className="col-4">
            <label className="form-label">Tipo falta</label>
            {!turnos.error && !turnos.isPending && (
              <SelectTipoFalta handle={handle} />
            )}
          </div>
        </div>
        {/* <div>
          <div className="form-check form-switch">
            <label className="form-label">
              Modificar hora entrada
              <input
                type="checkbox"
                className="form-check-input"
                onChange={handleCheckSwitch}
              />
            </label>
          </div>
        </div> */}
        {showHoraEntradaOpcional && (
          <div className="row">
            <div className="col-4">
              <label className="form-label">Hora de entrada asignada</label>
              <input
                title="Solo en caso de que la hora de entrada del empleado cambien momentaneamente"
                type="time"
                className="form-control"
                name="horaEntradaPermitida"
                required
              />
            </div>
          </div>
        )}

        <div className="mt-4">
          <button
            type="submit"
            className="btn btn-primary mx-auto d-block"
            disabled={formPending}
          >
            {formPending ? <Loader size="1.5" /> : "Enviar"}
          </button>
        </div>
      </form>
    </div>
  );
}

const SelectTipoFalta = ({ handle }) => {
  const { data, error, isPending } = useGetData("/entrada/faltas");
  /* let validar = true;
  if (body) {
    if (body.hasOwnProperty("idTurno") && body.hasOwnProperty("horaEntrada")) {
      let validarRetraso =
        new Date(
          `2000-01-01 ${
            turnos.find((t) => t.idturno === Number(body.idTurno)).hora_anticipo
          }`
        ) - new Date(`2000-01-01 ${body.horaEntrada}`);
      validarRetraso > 0 ? (validar = true) : (validar = false);
    }
  } */

  return (
    <select
      name="idTipoFalta"
      onChange={handle}
      className="form-select"
      defaultValue={0}
      // disabled={validar}
    >
      <option value="">Ninguna</option>
      {!error &&
        !isPending &&
        data.response.map((el) => (
          <option
            value={Number(el.idtipo_falta)}
            key={el.idtipo_falta}
            title={el.descripcion}
          >
            {el.tipo}
          </option>
        ))}
    </select>
  );
};

export default FormRetardos;

import { useState, useRef } from "react";
import useGetData from "../../hooks/useGetData";
import Loader from "../assets/Loader";
import InputFecha from "./InputFecha";
import InputSelectDep from "./InputSelectDep";
import HeaderForm from "../../GUI/HeaderForm";

function FormRetardos({
  emp,
  enviar,
  turnos,
  body,
  setBody,
  handle,
  formPending,
}) {
  const [empleados, setEmpleados] = useState(null);
  const changeDep = (e) => {
    const filEmp = emp.data.response.filter(
      (emp) => emp.iddepartamento === Number(e.target.value)
    );
    setEmpleados(filEmp);
  };

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
        <div className="row">
          <div className="col-6 mb-3">
            <label>Departamentos</label>
            <InputSelectDep handle={changeDep} />
          </div>
          <div className="col-6 mb-3">
            <label>Empleados</label>
            <select
              className="form-control"
              name="idEmpleado"
              onChange={handle}
              required
            >
              <option value=""> --Selecciona un empleado--</option>
              {!empleados
                ? false
                : empleados.map((e) => {
                    return (
                      <option
                        value={e.idempleado}
                        key={e.idempleado}
                      >{`${e.nombre} ${e.apellido_paterno} ${e.apellido_materno}`}</option>
                    );
                  })}
            </select>
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
            <label className="form-label mb-0">Hora</label>
            <input
              type="time"
              className="form-control"
              data={body}
              onChange={handle}
              name="horaEntrada"
              ref={InputHora}
              required
            />
          </div>
          <div className="col-4">
            <label className="form-label">Tipo falta</label>
            {!turnos.error && !turnos.isPending && (
              <SelectTipoFalta handle={handle} j />
            )}
          </div>
        </div>
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
      <option value=""></option>
      {!error &&
        !isPending &&
        data.response.map((el) => (
          <option
            value={el.idtipo_falta}
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

import { useState } from "react";
import useGetData from "../../hooks/useGetData";
import InputFecha from "./InputFecha";
import InputSelectEmpleado from "./InputSelectEmpleado";

function FormChecklistNuevo() {
  const despachador = useGetData(`/empleado?departamento=1`);
  const [checkErroneo] = useState(false);
  const [body, setBody] = useState({
    islaLimpia: 1,
    aceitesCompletos: 1,
  });

  const handle = (e) => setBody({ ...body, [e.target.name]: e.target.value });

  return (
    <div className="container">
      <form
        className="row m-auto shadow rounded p-3 mt-3"
        style={{ width: "800px" }}
      >
        <div className="col-6 mb-5">
          <label className="form-label">Fecha</label>
          <InputFecha
            data={body}
            setData={setBody}
            handle={handle}
            name="fecha"
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Empleado</label>
          {!despachador.error && !despachador.isPending && (
            <InputSelectEmpleado
              empleados={despachador.data.response}
              name="empleado"
              handle={handle}
            />
          )}
        </div>
        <div className="d-flex justify-content-evenly">
          <label className="form-label col-4">Estacion</label>
          <div className="w-50 d-flex justify-content-evenly">
            <label className="form-label rounded border p-2 d-flex flex-column">
              Cumple
              <input
                type="radio"
                name="estacion"
                className="input-check-form"
                value={1}
                onChange={handle}
                defaultChecked
                disabled={checkErroneo}
              />
            </label>
            <label className="form-label rounded border p-2 d-flex flex-column">
              No cumple
              <input
                type="radio"
                name="estacion"
                onChange={handle}
                className="input-check-form"
                value={0}
                disabled={checkErroneo}
              />
            </label>
          </div>
        </div>
        <div className="d-flex justify-content-evenly">
          <label className="form-label col-4">Turno</label>
          <div className="w-50 d-flex justify-content-evenly">
            <label className="form-label rounded border p-2 d-flex flex-column">
              Cumple
              <input
                type="radio"
                name="turno"
                className="input-check-form"
                value={1}
                onChange={handle}
                defaultChecked
                disabled={checkErroneo}
              />
            </label>
            <label className="form-label rounded border p-2 d-flex flex-column">
              No cumple
              <input
                type="radio"
                name="turno"
                onChange={handle}
                className="input-check-form"
                value={0}
                disabled={checkErroneo}
              />
            </label>
          </div>
        </div>
        <div className="d-flex justify-content-evenly">
          <label className="form-label col-4">Bomba</label>
          <div className="w-50 d-flex justify-content-evenly">
            <label className="form-label rounded border p-2 d-flex flex-column">
              Cumple
              <input
                type="radio"
                name="bomba"
                className="input-check-form"
                value={1}
                onChange={handle}
                defaultChecked
                disabled={checkErroneo}
              />
            </label>
            <label className="form-label rounded border p-2 d-flex flex-column">
              No cumple
              <input
                type="radio"
                name="bomba"
                onChange={handle}
                className="input-check-form"
                value={0}
                disabled={checkErroneo}
              />
            </label>
          </div>
        </div>
        <div className="d-flex justify-content-evenly">
          <label className="form-label col-4">Isla limpia</label>
          <div className="w-50 d-flex justify-content-evenly">
            <label className="form-label rounded border p-2 d-flex flex-column">
              Cumple
              <input
                type="radio"
                name="islaLimpia"
                className="input-check-form"
                value={1}
                onChange={handle}
                defaultChecked
                disabled={checkErroneo}
              />
            </label>
            <label
              className="fo
            rm-label rounded border p-2 d-flex flex-column"
            >
              No cumple
              <input
                type="radio"
                name="islaLimpia"
                onChange={handle}
                className="input-check-form"
                value={0}
                disabled={checkErroneo}
              />
            </label>
          </div>
        </div>
        <div className="d-flex justify-content-evenly">
          <label className="form-label col-4">Aceites completos</label>
          <div className="w-50 d-flex justify-content-evenly">
            <label className="form-label rounded border p-2 d-flex flex-column">
              Cumple
              <input
                type="radio"
                name="aceitesCompletos"
                className="input-check-form"
                value={1}
                onChange={handle}
                defaultChecked
                disabled={checkErroneo}
              />
            </label>
            <label className="form-label rounded border p-2 d-flex flex-column">
              No cumple
              <input
                type="radio"
                name="aceitesCompletos"
                onChange={handle}
                className="input-check-form"
                value={0}
                disabled={checkErroneo}
              />
            </label>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button class="btn btn-primary">enviar</button>
        </div>
      </form>
    </div>
  );
}

export default FormChecklistNuevo;

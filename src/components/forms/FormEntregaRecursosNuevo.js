import React from "react";
import InputFecha from "./InputFecha";
import HeaderForm from "../../GUI/HeaderForm";
import InputSelectEmpleado from "./InputSelectEmpleado";
import useGetData from "../../hooks/useGetData";
import Loader from "../assets/Loader";

const FormEntregaRecurso = ({ enviar, handle, formPending, body, setBody }) => {
  const empleados = useGetData(`/empleado`);
  console.log(empleados);
  return (
    <form onSubmit={enviar} className="mt-3 m-auto shadow p-4">
      <HeaderForm />
      <div className="row">
        <div className="col-5">
          <label className="form-label mb-0">Fecha</label>
          <InputFecha
            name="fecha"
            handle={handle}
            data={body}
            setData={setBody}
          />
        </div>
        {/* Tipo de entrada */}
        <div className="col-7">
          <label className="form-label mb-0">Tipo de entrada</label>
          <select
            className="form-select"
            onChange={handle}
            id="entradas"
            name="tipo"
            required
          >
            <option value="">Tipo de entradas</option>
            <option value={1}>Entrega</option>
            <option value={2}>Recibe</option>
          </select>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <label className="form-label mb-0 mt-2">Empleado</label>
          {!empleados.error && !empleados.isPending && (
            <InputSelectEmpleado
              empleados={empleados.data.response}
              name="idEmpleado"
              handle={handle}
            />
          )}
        </div>
      </div>
      <div className="mt-2">
        <button
          className="btn btn-primary mx-auto d-block"
          disabled={formPending}
        >
          {formPending ? <Loader size="1.5" /> : "Guardar"}
        </button>
      </div>
    </form>
  );
};

export default FormEntregaRecurso;

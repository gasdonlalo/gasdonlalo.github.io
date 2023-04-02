import { useState } from "react";
import HeaderForm from "../../GUI/HeaderForm";
import useGetData from "../../hooks/useGetData";
import Loader from "../assets/Loader";
function FormSolEmpleo({ handle, enviar, pendiente }) {
  const dept = useGetData("/departamento");
  const [estatus, setestatus] = useState(" ");

  const getEstatus = (e) => {
    handle(e);
    setestatus(Number(e.target.value));
  };

  console.log(estatus);

  return (
    <div className="container w-50 shadow">
      <HeaderForm />
      <form onSubmit={enviar}>
        <div className="row">
          <div className="mb-3 col-4">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              name="nombre"
              onChange={handle}
              required
            />
          </div>
          <div className="mb-3 col-4">
            <label className="form-label">Apellido paterno</label>
            <input
              type="text"
              className="form-control"
              name="apellidoPaterno"
              onChange={handle}
              required
            />
          </div>
          <div className="mb-3 col-4">
            <label className="form-label">Apellido materno</label>
            <input
              type="text"
              className="form-control"
              name="apellidoMaterno"
              onChange={handle}
              required
            />
          </div>
          <div className="mb-3 col-6">
            <label className="form-label">Edad del solicitante</label>
            <input
              type="number"
              min="0"
              className="form-control"
              name="edad"
              onChange={handle}
              onDoubleClickCapture={handle}
            />
          </div>
          <div className="mb-3 col-6">
            <label className="form-label">Area solicitante</label>
            <select
              className="form-control"
              name="idDepartamento"
              onChange={handle}
              required
            >
              <option value="">
                {dept.isPending
                  ? "Cargando departamentos..."
                  : "--Selecciona una opción--"}
              </option>
              {!dept.data
                ? false
                : dept.data.response.map((e) => {
                    return (
                      <option value={e.iddepartamento}>{e.departamento}</option>
                    );
                  })}
            </select>
          </div>
        </div>

        <div className="row">
          <div className="mb-3 col-6">
            <label className="form-label">Estatus</label>
            <select
              className="form-select"
              name="estatus"
              onChange={(e) => getEstatus(e)}
              required
            >
              <option value="">--Selecciona un estatus--</option>
              <option value={1}>Aceptado</option>
              <option value={2}>Practicante</option>
              <option value={5}>Pendiente</option>
              <option value={4} className="text-danger">
                Rechazado
              </option>
            </select>
          </div>

          <div className="mb-3 col-6">
            <label className="form-label">Ingresar ID</label>
            <input
              type="number"
              className="form-control"
              name="idChecador"
              min="0"
              onChange={handle}
              placeholder="Dejar vacio si la solicitud es de estatus pendiente."
              disabled={!(estatus === 1 || estatus === 2)}
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">
            Motivo{" "}
            {estatus === " " || !estatus
              ? null
              : estatus === 1
              ? "de aceptacion"
              : estatus === 2
              ? "de aceptacion en practica"
              : estatus === 5
              ? "de pendiente"
              : "de rechazo"}
          </label>
          <textarea
            type="text"
            step="0.01"
            min="0.00"
            className="form-control"
            name="motivo"
            onChange={handle}
          />
        </div>

        <button type="submit" className="btn btn-primary start-50 mb-3">
          {pendiente ? <Loader size="1.5" /> : "Añadir"}
        </button>
      </form>
    </div>
  );
}

export default FormSolEmpleo;

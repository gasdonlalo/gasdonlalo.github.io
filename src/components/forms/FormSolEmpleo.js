import useGetData from "../../hooks/useGetData";
import Loader from "../assets/Loader";
function FormSolEmpleo({ handle, enviar, pendiente }) {
  const dept = useGetData("/departamento");

  return (
    <div className="container">
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
            <label className="form-label">
              Fecha de nacimiento del solicitante
            </label>
            <input
              type="date"
              className="form-control"
              name="fechaNacimiento"
              onChange={handle}
              onDoubleClickCapture={handle}
              required
            />
          </div>
          <div className="mb-3 col-6">
            <label className="form-label">Area solicitante</label>
            <select
              className="form-control"
              name="idDepartamento"
              onChange={handle}
            >
              <option value=" ">
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
            <select className="form-select" name="estatus" onChange={handle}>
              <option value={null}>--Selecciona un estatus--</option>
              <option value={1}>Aceptado</option>
              <option value={2}>Pasante</option>
              <option value={5}>Pendiente</option>
            </select>
          </div>

          <div className="mb-3 col-6">
            <label className="form-label">Ingresar ID</label>
            <input
              type="number"
              className="form-control"
              name="idEmpleado"
              onChange={handle}
              placeholder="Dejar vacio si la solicitud es de estatus pendiente."
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Motivo de solicitud</label>
          <textarea
            type="text"
            step="0.01"
            min="0.00"
            className="form-control"
            name="motivo"
            onChange={handle}
          />
        </div>

        <button type="submit" className="btn btn-primary start-50">
          {pendiente ? <Loader size="1.5" /> : "Añadir"}
        </button>
      </form>
    </div>
  );
}

export default FormSolEmpleo;

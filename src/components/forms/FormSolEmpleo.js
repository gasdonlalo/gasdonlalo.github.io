import useGetData from "../../hooks/useGetData";
function FormSolEmpleo({ handle, enviar, setData, data }) {

  const dept = useGetData("/departamento");

  return (
    <div className="container">
      <form onSubmit={enviar}>
        <div className="row">
          <div className="mb-3 col-4">
            <label className="form-label">
              Nombre
            </label>
            <input
              type="text"
              className="form-control"
              name="nombre"
              onChange={handle}
              required
            />
          </div>
           <div className="mb-3 col-4">
            <label className="form-label">
              apellido paterno
            </label>
            <input
              type="text"
              className="form-control"
              name="apellidoPaterno"
              onChange={handle}
              required
            />
          </div>
            <div className="mb-3 col-4">
            <label className="form-label">
              apellido materno
            </label>
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
            <label className="form-label">
              Area solicitante
            </label>
            <select className="form-control" name="idDepartamento" onChange={handle}>
              <option value={null}>--Selecciona un departamento--</option>
              {!dept.data ? false : dept.data.response.map(e => { return <option value={e.iddepartamento}>{e.departamento}</option>})}
            </select>
          </div>
        </div>

        <div className="row">
          <div className="mb-3 col-6">
            <label className="form-label">
              Estatus
            </label>
            <select className="form-select" name="estatus" onChange={handle}>
              <option value={null}>--Selecciona un estatus--</option>
              <option value={Number("1")}>Aceptado</option>
              <option value={Number("2")}>Pasante</option>
              <option value={Number("3")}>Despido</option>
              <option value={Number("4")}>Rechazo</option>
              <option value={Number("5")}>Pendiente</option>
            </select>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">
            Motivo de solicitud/despido/rechazo
          </label>
          <textarea
            type="text"
            step="0.01"
            min="0.00"
            className="form-control"
            name="Motivo"
            onChange={handle}
          />
        </div>

        <button type="submit" className="btn btn-primary start-50">
          Añadir
        </button>
      </form>
    </div>
  );
}

export default FormSolEmpleo;

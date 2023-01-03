import InputFecha from "./InputFecha";
function FormSolEmpleo({ handle, enviar, setData, data }) {
  return (
    <div className="container">
      <form onSubmit={enviar}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Nombre del solicitante
          </label>
          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            name="empleado"
            onChange={handle}
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Fecha de nacimiento del solicitante
          </label>
          <input
            type="date"
            className="form-control"
            aria-describedby="emailHelp"
            name="fecha_nacimiento"
            onChange={handle}
            onDoubleClickCapture={handle}
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Fecha de registro de solicitud
          </label>
          <InputFecha
            name={"fecha_solicitud"}
            handle={handle}
            data={data}
            setData={setData}
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Motivo
          </label>
          <textarea
            type="text"
            step="0.01"
            min="0.00"
            className="form-control"
            aria-describedby="emailHelp"
            name="motivo"
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

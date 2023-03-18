function FormMontoFalt({ handle, enviar }) {
  return (
    <div className="container">
      <form onSubmit={enviar}>
        <div className="mb-3">
          <label className="form-label">ID de empleado</label>
          <input
            type="number"
            className="form-control"
            aria-describedby="emailHelp"
            name="idEmpleado"
            onChange={handle}
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Fecha
          </label>
          <input
            type="date"
            className="form-control"
            aria-describedby="emailHelp"
            name="fecha"
            onChange={handle}
            onDoubleClickCapture={handle}
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Monto
          </label>
          <input
            type="number"
            step="0.01"
            min="0.00"
            className="form-control"
            aria-describedby="emailHelp"
            name="cantidad"
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
export default FormMontoFalt;

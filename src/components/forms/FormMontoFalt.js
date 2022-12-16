function FormMontoFalt({ handle, enviar }) {
  return (
    <div className="container">
      <form onSubmit={enviar}>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            ID de empleado
          </label>
          <input
            type="number"
            className="form-control"
            aria-describedby="emailHelp"
            name="idempleado"
            onChange={handle}
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            defaultvalue="ola"
            disabled
            readonly
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Monto
          </label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            aria-describedby="emailHelp"
            name="monto"
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

function FormMontoFalt() {
  return (
    <div className="container">
      <form onSubmit="">
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            name="banco"
            onChange=""
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Monto
          </label>
          <input
            type="number"
            className="form-control"
            aria-describedby="emailHelp"
            name="clabe"
            onChange=""
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

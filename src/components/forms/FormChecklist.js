function FormChecklist({ handle, enviar }) {
  return (
    <div className="container">
      <form onSubmit={enviar}>
        <div className="row">
          <div className="mb-3 col-10">
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
          {/* <div className="mb-3 col-2 ">
            <label for="exampleInputEmail1" className="form-label">
              ID puntaje minimo
            </label>
            <input
              type="number"
              min="0"
              className="form-control"
              aria-describedby="emailHelp"
              name="idpuntajeMinimo"
              onReset={handle}
              value="1"
              disabled
            />
          </div> */}
        </div>

        {/* <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Estacion de servicio
          </label>
          <select class="form-select" name="estacion" onChange={handle}>
            <option value={null}>Elige una opción</option>
            <option value="1">GDL 1</option>
            <option value="2">GDL 2</option>
          </select>
        </div> */}
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Turno
          </label>
          <select className="form-select" name="turno" onChange={handle}>
            <option>Elige una opción</option>
            <option value="Mañana">Mañana</option>
            <option value="Tarde">Tarde</option>
            <option value="Noche">Noche</option>
          </select>
        </div>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Numero de bomba
          </label>
          <select className="form-select" name="idbomba" onChange={handle}>
            <option>Elige una opción</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div className="row border mb-3">
          <div className="mb-3 col-6">
            <label for="exampleInputEmail1" className="form-label">
              ¿Isla limpia?
            </label>
            <select className="form-select" name="islaLimpia" onChange={handle}>
              <option>Elige una opción</option>
              <option value="1">Cumple</option>
              <option value="0">No cumple</option>
            </select>
          </div>
          <div className="mb-3 col-6">
            <label for="exampleInputEmail1" className="form-label">
              ¿Aceites completos?
            </label>
            <select
              className="form-select"
              name="aceitesCompletos"
              onChange={handle}
            >
              <option value={null}>Elige una opción</option>
              <option value="1">Cumple</option>
              <option value="0">No cumple</option>
            </select>
          </div>
        </div>
        <div className="row border mb-3">
          <div className="mb-3 col-6">
            <label for="exampleInputEmail1" className="form-label">
              ID empleado saliente
            </label>
            <input
              type="number"
              min="0"
              className="form-control"
              aria-describedby="emailHelp"
              name="idempleadoSaliente"
              onChange={handle}
            />
          </div>
          <div className="mb-3 col-6">
            <label for="exampleInputEmail1" className="form-label">
              ID empleado entrante
            </label>
            <input
              type="number"
              min="0"
              className="form-control"
              aria-describedby="emailHelp"
              name="idempleadoEntrante"
              onChange={handle}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Enviar
        </button>
      </form>
    </div>
  );
}
export default FormChecklist;

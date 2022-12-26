function FormRecursosDesp({ enviar, datos, handle }) {
  return (
    <div>
      <form onSubmit={enviar}>
        <div>
          <label>Fecha</label>
          <input
            className="form-control"
            type="date"
            name="fecha"
            onChange={handle}
          />
        </div>
        <div>
          <label>Empleado</label>
          <select className="form-control" name="empleado" onChange={handle}>
            <option value="0"> Selecciona un empleado...</option>
            {!datos.data
              ? false
              : datos.data.response.map((e) => {
                  return (
                    <option
                      value={e.idempleado}
                    >{`${e.nombre} ${e.apellido_paterno} ${e.apellido_materno}`}</option>
                  );
                })}
          </select>
        </div>
        <div>
          <label>Cantidad</label>
          <input
            className="form-control"
            type="number"
            min="0"
            name="cantidad"
            onChange={handle}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Enviar
        </button>
      </form>
    </div>
  );
}

export default FormRecursosDesp;

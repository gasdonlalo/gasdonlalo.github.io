function FormRecursosDesp({ enviar, datos, handle, pasos, puntos }) {
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
          {!pasos.data
            ? false
            : pasos.data.response.map((e) => {
                return (
                  <div>
                    <label>{e.recurso}</label>
                    <select
                      className="form-control"
                      onChange={puntos}
                      name={e.recurso}
                      id={e.idrecurso}
                    >
                      <option value={null}>Selecciona una opcion</option>
                      <option value="1">Cumple</option>
                      <option value="0">No cumple</option>
                    </select>
                  </div>
                );
              })}
        </div>
        <button type="submit" className="btn btn-primary">
          Enviar
        </button>
      </form>
    </div>
  );
}

export default FormRecursosDesp;

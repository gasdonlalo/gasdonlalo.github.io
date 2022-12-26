function FormDespachar({ handle, handleEval, datos, enviar, pasos }) {
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
          Pasos para despachar
          {!pasos.data
            ? false
            : pasos.data.response.map((e) => {
                return (
                  <div>
                    <label>{e.paso}</label>
                    <select
                      className="form-control"
                      name={e.paso}
                      id={e.idpaso_despachar}
                      onChange={handleEval}
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

export default FormDespachar;

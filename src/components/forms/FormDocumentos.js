function FormDocumentos({handle , datos, enviar}) {
  return (
    <div className="container">
      <form onSubmit={enviar}>
        <div className="row">
          <div className="mb-3 col-6">
            <label>empleado</label>
            <select
              className="form-control"
              name="idempleado"
              onChange={handle}
            >
            <option value="0"> Selecciona un empleado </option>
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
        </div>
        <table className="table align-middle">
          <thead>
            <tr>
              <th scope="col">Documentos</th>
            </tr>
          </thead>

        </table>
      </form>
    </div>
  );
};

export default FormDocumentos;
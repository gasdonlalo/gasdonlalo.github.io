function Tabla({ datos }) {
  return (
    <div>
      <table className="table table-bordered ">
        <thead>
          <tr>
            <th scope="col">Nombre completo del despachador</th>
            {datos.map((e) => {
              return <th>Semana {e.semana}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {datos.map((e) => {
            return (
              <tr>
                <th scope="row">{e.nombre_completo}</th>
                <td>{e.total}</td>
              </tr>
            );
          })}
          <tr>
            <th scope="row">ohayo</th>
            <td>sdasdas</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Tabla;

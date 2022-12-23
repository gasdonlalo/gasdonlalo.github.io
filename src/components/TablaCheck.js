function TablaCheck({ datos }) {
  let dataExtract = datos.map((e) => e.data);
  console.log(dataExtract);
  return (
    <div className="table-responsive">
      <table className="table table-bordered">
        <thead>
          <tr className="table-secondary">
            <th scope="col">Nombre completo del despachador</th>
            {datos.map((e) => {
              return <th>{e.fecha}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {!dataExtract[0]
            ? false
            : dataExtract[0].map((e) => {
                return (
                  <tr>
                    <th>{e.nombre_completo}</th>
                    <td>{e.cumple ? 1 : 0}</td>
                  </tr>
                );
              })}
          {dataExtract.map((e) => (e) => {
            return <td>{e.cumple ? 1 : 0}</td>;
          })}

          {/* {datosCont.map((e) => {
            return (
              <tr>
                <th scope="row">{e.nombre_completo}</th>
                {e.semanas.map((el) => {
                  return <td>${el.cantidad}</td>;
                })}
                <td>${e.total}</td>
              </tr>
            );
          })} */}
        </tbody>
      </table>
    </div>
  );
}

export default TablaCheck;

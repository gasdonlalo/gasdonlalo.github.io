function TablaCheck({ datos }) {
  return (
    <div className="table-responsive">
      <table className="table table-bordered">
        <thead>
          <tr className="table-secondary">
            <th scope="col">Nombre completo del despachador</th>
            {datos.map((e) => {
              return <th>{e.fecha}</th>;
            })}

            <th>Total mensual</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((e) => {
            return (
              <tr>
                <th>{e.data.nombre_completo}</th>
              </tr>
            );
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
          <tr>
            <td colSpan={datos.totalSemanas + 1}></td>
            <td className="fw-bold">${datos.montoTotalMes}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TablaCheck;

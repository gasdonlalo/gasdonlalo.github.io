function Tabla({ datos }) {
  const datosCont = datos.response;

  const TablaSemana = () => {
    const semana = [];
    for (let i = 0; i < datos.totalSemanas; i++) {
      semana.push(<th>Semana {i + 1}</th>);
    }
    return semana.map((el) => el);
  };

  return (
    <div>
      <table className="table table-bordered ">
        <thead>
          <tr className="table-secondary">
            <th scope="col">Nombre completo del despachador</th>
            <TablaSemana />
            <th>Total mensual</th>
          </tr>
        </thead>
        <tbody>
          {datosCont.map((e) => {
            return (
              <tr>
                <th scope="row">{e.nombre_completo}</th>
                {e.semanas.map((el) => {
                  return <td>${el.cantidad}</td>;
                })}
                <td>${e.total}</td>
              </tr>
            );
          })}
          <tr>
            <td colSpan={datos.totalSemanas + 1}></td>
            <td className="fw-bold">${datos.montoTotalMes}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Tabla;

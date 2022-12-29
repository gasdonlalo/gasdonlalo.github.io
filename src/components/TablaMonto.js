import format from "./assets/format";
function TablaMonto({ datos }) {
  const datosCont = datos.response;

  return (
    <div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th className="text-center align-middle">
              NOMBRE COMPLETO DEL DESPACHADOR
            </th>
            {datosCont[0].semanas.map((el) => (
              <td className="text-center">
                <span className="fw-bold">Semana {el.semana}</span>
                <br />
                {format.obtenerDiaMes(el.diaEmpiezo)} al{" "}
                {format.obtenerDiaMes(el.diaTermino)} de{" "}
                {format.formatMes(el.diaEmpiezo)}
              </td>
            ))}
            <th className="text-center align-middle">Monto Mensual</th>
          </tr>
          {datosCont.map((el, i) => (
            <tr key={i}>
              <td>{el.nombre_completo}</td>
              {el.semanas.map((se) => (
                <td key={se.semana}>
                  {se.cantidad > 0 ? format.formatDinero(se.cantidad) : null}{" "}
                </td>
              ))}
              <td>{format.formatDinero(el.total)}</td>
            </tr>
          ))}
          <tr>
            <th colSpan={datos.totalSemanas + 1}></th>
            <th className="bg-danger text-white">
              {format.formatDinero(datos.montoTotalMes)}
            </th>
          </tr>
        </thead>
      </table>
    </div>
  );
}

export default TablaMonto;

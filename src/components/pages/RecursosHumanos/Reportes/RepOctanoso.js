import InputChangeYear from "../../../forms/InputChangeYear";
import InputChangeMes from "../../../forms/InputChangeMes";
import useGetData from "../../../../hooks/useGetData";
import { useState } from "react";
import HeaderComponents from "../../../../GUI/HeaderComponents";
import format from "../../../assets/format";

function RepOctanoso() {
  const date = new Date();
  const estaciones = useGetData("/estaciones-servicio");
  const [mes, setMes] = useState(date.getMonth() + 1);
  const [year, setYear] = useState(date.getFullYear());
  const [estacion, setEstacion] = useState(null);

  const changeMes = (e) => {
    setMes(e.target.value);
  };

  const changeYear = (e) => {
    setYear(e.target.value);
  };

  const changeEstacion = (e) => {
    setEstacion(e.target.value);
  };

  const datosTabla = useGetData(`/octanoso/reporte/${year}/${mes}/${estacion}`); //año/mes/estacion de servicio
  console.log(datosTabla);
  return (
    <div className="Main">
      <HeaderComponents
        urlBack="/recursos-humanos"
        textUrlback="Volver a recursos humanos"
        title="Reporte de concurso el octanoso"
      />
      <div className="container">
        <form>
          <div className="row">
            <div className="mb-3 col-4">
              <label>Selecciona un mes</label>
              <InputChangeMes handle={changeMes} defaultMes={mes} />
            </div>
            <div className="mb-3 col-4">
              <label>Selecciona un año</label>
              <InputChangeYear handle={changeYear} defaultYear={year} />
            </div>
            <div className="mb-3 col-4">
              <label>Selecciona una estacion</label>
              <select className="form-control" onChange={changeEstacion}>
                <option value=" ">--Selecciona una estación--</option>
                {!estaciones.data
                  ? false
                  : estaciones.data.response.map((e) => {
                      return (
                        <option
                          value={e.idestacion_servicio}
                          key={e.idestacion_servicio}
                        >
                          {e.nombre}
                        </option>
                      );
                    })}
              </select>
            </div>
          </div>
        </form>
      </div>

      <div className="container-fluid table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Nombre de los despachadores</th>
              {!datosTabla.data
                ? false
                : !datosTabla.data.response[0].datos
                ? false
                : datosTabla.data.response[0].datos.map((e) => {
                    return <th>{format.formatFechaComplete(e.fecha)}</th>;
                  })}
            </tr>
          </thead>
          <tbody>
            {!datosTabla.data
              ? false
              : datosTabla.data.response.map((e) => {
                  return (
                    <tr>
                      {!e.empleado ? (
                        false
                      ) : (
                        <td>{`${e.empleado.nombre} ${e.empleado.apellido_paterno} ${e.empleado.apellido_materno}`}</td>
                      )}
                      {!e.datos
                        ? false
                        : e.datos.map((e) => (
                            <td key={e.fecha}>{e.cantidad} L</td>
                          ))}
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RepOctanoso;

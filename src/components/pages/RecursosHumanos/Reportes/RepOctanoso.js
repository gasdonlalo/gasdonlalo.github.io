import InputChangeYear from "../../../forms/InputChangeYear";
import InputChangeMes from "../../../forms/InputChangeMes";
import useGetData from "../../../../hooks/useGetData";
import { Fragment, useState } from "react";
import HeaderComponents from "../../../../GUI/HeaderComponents";
import format from "../../../assets/format";
import Bar from "../../../charts/Bar";

function RepOctanoso() {
  const date = new Date();
  const estaciones = useGetData("/estaciones-servicio");
  const [mes, setMes] = useState(date.getMonth() + 1);
  const [year, setYear] = useState(date.getFullYear());
  const [estacion, setEstacion] = useState(null);
  console.log(estacion);

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
  //devuelve los datos para la tabla y grafica
  const totalTabla = !datosTabla.data
    ? false
    : datosTabla.data.response.map((e) => {
        let nombres = !e.empleado
          ? false
          : format.formatTextoMayusPrimeraLetra(
              `${e.empleado.nombre} ${e.empleado.apellido_paterno} ${e.empleado.apellido_materno}`
            );
        let suma = !e.datos
          ? false
          : e.datos.map((e) => e.cantidad).reduce((a, b) => a + b, 0);

        let sumaNC = !e.datos
          ? false
          : e.datos.map((e) => e.salidaNC).reduce((a, b) => a + b, 0);
        return { nombre: nombres, cantidadLitros: suma, cantidadNC: sumaNC };
      });
  let datosBar = {
    labels: !totalTabla ? false : totalTabla.map((e) => e.nombre),
    dataset: [
      {
        data: !totalTabla ? false : totalTabla.map((e) => e.cantidadLitros),
        backgroundColor: "rgba(6,43,223,1)",
        borderColor: "rgba(6,43,223,1)",
        label: "Litros vendidos",
      },
      {
        data: !totalTabla ? false : totalTabla.map((e) => e.cantidadNC),
        backgroundColor: "rgba(253,124,13,1)",
        borderColor: "rgba(6,43,223,1)",
        label: "Salidas no conformes",
      },
    ],
  };
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
      {/* Termina select */}
      {/* Contenedor tabla */}
      {datosTabla.error ? (
        estacion === " " || estacion === null ? (
          <h4>Por favor selecciona una estacion</h4>
        ) : (
          <h4>ola</h4>
        )
      ) : (
        <div>
          <h4>Vista detallada</h4>

          <div className="container-fluid table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col" rowSpan={2}>
                    Nombre de los despachadores
                  </th>
                  {!datosTabla.data
                    ? false
                    : !datosTabla.data.response[0] ||
                      !datosTabla.data.response[0].datos
                    ? false
                    : datosTabla.data.response[0].datos.map((e) => {
                        return (
                          <th colSpan={2} key={e.fecha}>
                            <span>{format.formatFechaComplete(e.fecha)}</span>
                          </th>
                        );
                      })}
                </tr>
                <tr>
                  {!datosTabla.data
                    ? false
                    : !datosTabla.data.response[0] ||
                      !datosTabla.data.response[0].datos
                    ? false
                    : datosTabla.data.response[0].datos.map((e, i) => (
                        <Fragment>
                          <th key={e}>Litros vendidos</th>
                          <th key={i}>Salidas no conformes</th>
                        </Fragment>
                      ))}
                </tr>
              </thead>
              <tbody>
                {!datosTabla.data
                  ? false
                  : datosTabla.data.response.map((e, i) => {
                      return (
                        <tr>
                          {!e.empleado ? (
                            false
                          ) : (
                            <td key={i}>
                              {format.formatTextoMayusPrimeraLetra(
                                `${e.empleado.nombre} ${e.empleado.apellido_paterno} ${e.empleado.apellido_materno}`
                              )}
                            </td>
                          )}
                          {!e.datos
                            ? false
                            : e.datos.map((e, i, j) => {
                                return (
                                  <Fragment>
                                    <td key={i}>{e.cantidad} L</td>
                                    <td key={j}>{e.salidaNC}</td>
                                  </Fragment>
                                );
                              })}
                        </tr>
                      );
                    })}
              </tbody>
            </table>
          </div>
          {/* Termina tabla detalles */}
          <h4 className="mt-3">Vista general</h4>
          <div className="d-flex align-items-center container-fluid border-top mt-3">
            <div className="w-25 mt-3">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Nombre de los despachadores</th>
                    <th scope="col">Total de litros vendidos</th>
                    <th scope="col">Total de salidas no conformes</th>
                  </tr>
                </thead>
                <tbody>
                  {!totalTabla
                    ? false
                    : totalTabla.map((e) => {
                        return (
                          <tr>
                            <td>{e.nombre}</td>
                            <td>{e.cantidadLitros} L</td>
                            <td>{e.cantidadNC}</td>
                          </tr>
                        );
                      })}
                </tbody>
              </table>
            </div>
            <div className="w-75 m-auto">
              <Bar datos={datosBar} text="" />
            </div>
          </div>
          {/* Termina tabla */}
        </div>
      )}
    </div>
  );
}

export default RepOctanoso;

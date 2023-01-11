import InputChangeYear from "../../../forms/InputChangeYear";
import InputChangeMes from "../../../forms/InputChangeMes";
import useGetData from "../../../../hooks/useGetData";
import { Fragment, useState } from "react";
import HeaderComponents from "../../../../GUI/HeaderComponents";
import format from "../../../assets/format";
import Bar from "../../../charts/Bar";

function RepAceitoso() {
  let colores = [
    "rgba(219,42,62,1)",
    "rgba(255,255,10,1)",
    "rgba(149,202,255,1)",
    "rgba(149,202,255,1)",
    "rgba(149,202,10,1)",
  ];
  const date = new Date();
  const estaciones = useGetData("/estaciones-servicio");
  const [mes, setMes] = useState(date.getMonth() + 1);
  const [year, setYear] = useState(date.getFullYear());
  const [estacion, setEstacion] = useState(null);
  const datosTabla = useGetData(
    estacion === " " ? null : `/aceitoso/reporte/${year}/${mes}/${estacion}`
  );

  const changeMes = (e) => {
    setMes(e.target.value);
  };

  const changeYear = (e) => {
    setYear(e.target.value);
  };

  const changeEstacion = (e) => {
    setEstacion(e.target.value);
  };

  return (
    <div className="Main">
      <HeaderComponents
        urlBack="/recursos-humanos"
        textUrlback="Volver a recursos humanos"
        title="Reporte de concurso el aceitoso"
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
      <div>
        {!datosTabla.error && !datosTabla.isPending ? (
          <Correcto datosTabla={datosTabla} colores={colores} />
        ) : estacion === " " || estacion === null ? (
          <h4>Por favor, selecciona una estación </h4>
        ) : (
          <h4>{!datosTabla.dataError ? false : datosTabla.dataError.msg}</h4>
        )}
      </div>
    </div>
  );
}
const Correcto = ({ datosTabla, colores }) => {
  const totalTabla = datosTabla.data.response
    .map((e) => {
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
    })
    .sort((a, b) => b.cantidadLitros - a.cantidadLitros);
  console.log(totalTabla);

  let datosBar = {
    labels: totalTabla.map((e) => e.nombre),
    dataset: [
      {
        data: totalTabla.map((e) => e.cantidadLitros),
        backgroundColor: totalTabla.map((e, index) => {
          if (index < 5) {
            return colores[index];
          } else {
            return colores[4];
          }
        }),
        borderColor: "rgba(6,43,223,1)",
        label: "Litros vendidos",
      },
      {
        data: totalTabla.map((e) => e.cantidadNC),
        backgroundColor: "rgba(253,124,13,1)",
        label: "Salidas no conformes",
      },
    ],
  };
  return (
    <div>
      <h4>Vista detallada</h4>
      <div className="container-fluid table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col" rowSpan={2}>
                Nombre de los despachadores
              </th>
              {!datosTabla.data.response[0].datos
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
              {!datosTabla.data.response[0].datos
                ? false
                : datosTabla.data.response[0].datos.map((e, i) => (
                    <Fragment>
                      <th key={e}>Pesos de aceites vendidos</th>
                      <th key={i}>Salidas no conformes generadas</th>
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
                                <td key={i}>$ {e.cantidad}</td>
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
      <div className="container-fluid border-top mt-3">
        <div className="container mt-3">
          <table className="table table-bordered border-dark align-middle text-center">
            <thead>
              <tr>
                <th scope="col">Nombre de los despachadores</th>
                <th scope="col">Total de aceites vendidos en pesos</th>
                <th scope="col">Total de salidas no conformes</th>
              </tr>
            </thead>
            <tbody>
              {totalTabla.map((e, index) => {
                return (
                  <tr
                    style={
                      index < 4 ? { backgroundColor: colores[index] } : null
                    }
                  >
                    <td>{e.nombre}</td>
                    <td>{e.cantidadLitros} L</td>
                    <td>{e.cantidadNC}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* Tabla principal */}
        <h4>Vista general</h4>
        <div className="d-flex align-items-center mt-3 border-top">
          <div className="w-25">
            <table className="table table-bordered  border-dark align-middle text-center">
              <thead>
                <tr>
                  <th>Lugar</th>
                  <th>Nombre</th>
                </tr>
              </thead>
              <tbody>
                {totalTabla.map((e, index) => {
                  while (index < 4) {
                    return (
                      <tr>
                        <td style={{ backgroundColor: colores[index] }}>
                          {index + 1}° lugar
                        </td>
                        <td> {e.nombre}</td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>

          <div className="w-75 m-auto">
            <Bar datos={datosBar} text="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepAceitoso;

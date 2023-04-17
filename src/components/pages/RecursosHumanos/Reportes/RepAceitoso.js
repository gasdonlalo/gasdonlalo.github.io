import Axios from "../../../../Caxios/Axios";
import useGetData from "../../../../hooks/useGetData";
import { Fragment, useEffect, useState } from "react";
import HeaderComponents from "../../../../GUI/HeaderComponents";
import format from "../../../assets/format";
import Bar from "../../../charts/Bar";
import Decimal from "decimal.js-light";
import IconComponents from "../../../assets/IconComponents";
import OffCanvasConfigIncumplimientos from "../../../assets/OffCanvasConfigIncumplientos";
import Loader from "../../../assets/Loader";
import PdfV2 from "../../../pdf_generador/PdfV2";
import InputFechaC from "../../../forms/Controlado/InputFechaC";

function RepAceitoso() {
  let colores = [
    "rgba(219,42,62,1)",
    "rgba(255,255,10,1)",
    "rgba(149,202,255,1)",
    "rgba(149,202,255,1)",
    "rgba(149,202,10,1)",
  ];

  const estaciones = useGetData("/estaciones-servicio");

  const [datos, setDatos] = useState({});
  const [actualizador, setActualizador] = useState(false);

  const [datosTabla, setDatosTabla] = useState(null);
  const [error, setError] = useState(null);
  const [pendiente, setPendiente] = useState(false);

  const [showCanva, setShowCanva] = useState();
  const setShowCanvaOpen = () => setShowCanva(true);
  const setShowCanvaClose = () => setShowCanva(false);

  const handle = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };
  console.log(datos);
  useEffect(() => {
    const consultarDatos = async () => {
      setPendiente(true);
      try {
        const req = await Axios.post("/aceitoso/obtener", datos);
        setDatosTabla(req.data.response);
        setError(null);
        setPendiente(false);
      } catch (error) {
        setDatosTabla(null);
        setError(error.response.data.msg);
        setPendiente(false);
      }
    };
    if (actualizador || datos.hasOwnProperty("idEstacionServicio"))
      consultarDatos();
  }, [actualizador, datos]);
  return (
    <div className="Main">
      <HeaderComponents
        urlBack="/recursos-humanos"
        textUrlback="Volver a recursos humanos"
        title="Reporte de concurso el aceitoso"
      >
        <span onClick={setShowCanvaOpen}>
          <IconComponents icon="gear" text="Configurar SNC" />
        </span>
      </HeaderComponents>
      <OffCanvasConfigIncumplimientos
        show={showCanva}
        close={setShowCanvaClose}
        categorizacion={3}
        toogle={[actualizador, setActualizador]}
      />
      <div className="container">
        <div className="row">
          <div className="mb-3 col-4">
            <label>Selecciona una fecha de inicio</label>

            <InputFechaC name="fechaInicio" handle={handle} value={datos} />
          </div>
          <div className="mb-3 col-4">
            <label>Selecciona una fecha de fin</label>

            <InputFechaC name="fechaFinal" handle={handle} value={datos} />
          </div>
          <div className="mb-3 col-4">
            <label>Selecciona una estacion</label>
            <select
              className="form-control"
              onChange={handle}
              name="idEstacionServicio"
              required
            >
              <option value="">--Selecciona una estación--</option>
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
      </div>
      <div>
        {datosTabla && !pendiente && (
          <Correcto
            datosTabla={datosTabla}
            colores={colores}
            fechaInicio={datos.fechaInicio}
            fechaFin={datos.fechaFinal}
            estacion={datos.idEstacionServicio}
          />
        )}
        {error !== null ? <h4>{error}</h4> : null}
        {pendiente && <Loader />}
      </div>
    </div>
  );
}
const Correcto = ({ datosTabla, colores, fechaFin, fechaInicio, estacion }) => {
  const totalTabla = datosTabla
    .map((e) => {
      let nombres = !e.empleado
        ? false
        : format.formatTextoMayusPrimeraLetra(
            `${e.empleado.nombre} ${e.empleado.apellido_paterno} ${e.empleado.apellido_materno}`
          );
      let suma = !e.datos
        ? false
        : e.datos
            .map((e) => e.cantidad)
            .reduce((a, b) =>
              new Decimal(Number(a)).plus(Number(b)).toNumber()
            );

      let sumaNC = !e.datos
        ? false
        : e.datos.map((e) => e.salidaNC).reduce((a, b) => a + b, 0);

      let descalificado = !e.descalificado ? false : e.descalificado;
      return {
        nombre: nombres,
        cantidadLitros: suma,
        cantidadNC: sumaNC,
        descalificado: descalificado,
      };
    })
    .sort((a, b) => {
      if (
        (!a.descalificado && b.descalificado) ||
        (a.cantidadNC <= 3 && b.cantidadNC > 3)
      ) {
        return -1;
      } else if (
        (a.descalificado && !b.descalificado) ||
        (a.cantidadNC >= 3 && b.cantidadNC < 3)
      ) {
        return 1;
      } else {
        return b.cantidadLitros - a.cantidadLitros;
      }
    });

  let totalVendidoMes = totalTabla
    .map((e) => e.cantidadLitros)
    .reduce((a, b) => new Decimal(Number(a)).plus(Number(b)).toFixed(2)); //error con muneros solucionado con string o fixed metodos

  let datosBar = {
    labels: totalTabla.map((e) => e.nombre),
    dataset: [
      {
        data: totalTabla.map((e) => e.cantidadLitros),
        backgroundColor: totalTabla.map((e, index) => {
          if (index < 3 && !e.descalificado) {
            return colores[index];
          } else if (e.descalificado || e.cantidadNC >= 3) {
            return "rgba(202,202,202,1)";
          } else {
            return colores[4];
          }
        }),
        borderColor: "rgba(6,43,223,1)",
        label: "N/A",
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
              {datosTabla[0].datos.map((e) => {
                return (
                  <th colSpan={2} key={e.fecha}>
                    <span>{format.formatFechaComplete(e.fecha)}</span>
                  </th>
                );
              })}
            </tr>
            <tr>
              {datosTabla[0].datos.map((e, i) => (
                <Fragment>
                  <th key={e}>Pesos de aceites vendidos</th>
                  <th key={i}>Salidas no conformes generadas</th>
                </Fragment>
              ))}
            </tr>
          </thead>
          <tbody>
            {datosTabla.map((e, i) => {
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
                            <td key={i}>{format.formatDinero(e.cantidad)}</td>
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
        {/* Tabla principal */}
        <h4>Vista general</h4>
        {/* Tabla total mes y comision aproximada */}
        <div className="d-flex justify-content-evenly container-fluid border-top border-bottom mt-3 mb-3 align-items-center ">
          <div className="mt-3">
            <table className="table table-bordered border-dark align-middle text-center">
              <tbody>
                <tr>
                  <th scope="col">Total vendido</th>
                  <td>{format.formatDinero(totalVendidoMes)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-3">
            <table className="table table-bordered  border-dark align-middle text-center">
              <thead>
                <tr>
                  <th scope="col" colSpan={2}>
                    Comision correspondiente aproximada
                  </th>
                </tr>
              </thead>
              <tbody>
                {totalTabla.map((e, index) => {
                  if (index < 3) {
                    return (
                      <tr>
                        <td style={{ backgroundColor: colores[index] }}>
                          {index + 1}° lugar
                        </td>
                        <td>
                          {format.formatDinero(
                            new Decimal(Number(e.cantidadLitros)).times(
                              index === 0 ? 0.05 : index === 1 ? 0.03 : 0.02
                            )
                          )}
                        </td>
                      </tr>
                    );
                  } else {
                    return null;
                  }
                })}
              </tbody>
            </table>
          </div>
        </div>
        {/* Tremina tabla datos adicionales */}
        <div className="container-fluid mt-3">
          <div className="container mt-3">
            <table
              className="table table-bordered border-dark align-middle text-center"
              id="tabla"
            >
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
                        index < 3
                          ? { backgroundColor: colores[index] }
                          : e.descalificado || e.cantidadNC >= 3
                          ? { backgroundColor: "#cacaca" }
                          : null
                      }
                    >
                      <td>{e.nombre}</td>
                      <td>{format.formatDinero(e.cantidadLitros)}</td>
                      <td>
                        {e.descalificado
                          ? "Descalificado"
                          : e.cantidadNC >= 3
                          ? "Descalificado"
                          : e.cantidadNC}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* Tabla principal */}
          <div className="d-flex align-items-center mt-3" id="render">
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
                    if (index < 3) {
                      return (
                        <tr>
                          <td style={{ backgroundColor: colores[index] }}>
                            {index + 1}° lugar
                          </td>
                          <td> {e.nombre}</td>
                        </tr>
                      );
                    } else {
                      return null;
                    }
                  })}
                </tbody>
              </table>
            </div>

            <div className="w-75 m-auto">
              <Bar
                datos={datosBar}
                text=""
                optionsCustom={{
                  scales: {
                    x: {
                      title: {
                        display: true,
                        text: "Despachadores",
                        font: {
                          size: "20pt",
                        },
                      },
                    },
                    y: {
                      title: {
                        display: true,
                        text: "Cantidad en pesos",
                        font: {
                          size: "20pt",
                        },
                      },
                      ticks: {
                        callback: (value) => format.formatDinero(value),
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
        <PdfV2
          fechaInicio={fechaInicio}
          fechaFin={fechaFin}
          estacion={estacion}
          tabla="tabla"
          orientacion="portrait"
        />
      </div>
    </div>
  );
};

export default RepAceitoso;

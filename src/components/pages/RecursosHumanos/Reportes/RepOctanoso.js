import useGetData from "../../../../hooks/useGetData";
import { Fragment, useEffect, useState } from "react";
import HeaderComponents from "../../../../GUI/HeaderComponents";
import format from "../../../assets/format";
import Bar from "../../../charts/Bar";
import Axios from "../../../../Caxios/Axios";
import IconComponents from "../../../assets/IconComponents";
import OffCanvasConfigIncumplimientos from "../../../assets/OffCanvasConfigIncumplientos";
import Decimal from "decimal.js-light";
import PdfV2 from "../../../pdf_generador/PdfV2";
import Loader from "../../../assets/Loader";
import InputFechaC from "../../../forms/Controlado/InputFechaC";

function RepOctanoso() {
  //variable para colores
  let colores = [
    "rgba(219,42,62,1)",
    "rgba(255,255,10,1)",
    "rgba(149,202,255,1)",
    "rgba(149,202,255,1)",
    "rgba(149,202,10,1)",
  ];

  const [datosTabla, setDatosTabla] = useState(null);
  const [error, setError] = useState(null);
  const estaciones = useGetData("/estaciones-servicio");
  const [showCanva, setShowCanva] = useState();

  const [datos, setDatos] = useState({});
  const [pendiente, setPendiente] = useState(false);
  const [actualizador, setActualizador] = useState(false);

  const setShowCanvaOpen = () => setShowCanva(true);
  const setShowCanvaClose = () => setShowCanva(false);

  const handle = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const consultarDatos = async () => {
      setPendiente(true);
      try {
        const req = await Axios.post("/octanoso/obtener", datos);
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
        title="Reporte de concurso el octanoso"
      >
        <span onClick={setShowCanvaOpen}>
          <IconComponents icon="gear" text="Configurar SNC" />
        </span>
      </HeaderComponents>
      <OffCanvasConfigIncumplimientos
        show={showCanva}
        close={setShowCanvaClose}
        categorizacion={2}
        toogle={[actualizador, setActualizador]}
      />

      <div className="container">
        <div className="row">
          <div className="mb-3 col-4">
            <label>Selecciona una fecha de inicio</label>
            <InputFechaC handle={handle} name="fechaInicio" value={datos} />
          </div>
          <div className="mb-3 col-4">
            <label>Selecciona una fecha de fin</label>

            <InputFechaC handle={handle} value={datos} name="fechaFinal" />
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
      {/* Termina select */}
      {/* Contenedor tabla */}

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
  );
}
const Correcto = ({ datosTabla, colores, fechaFin, fechaInicio, estacion }) => {
  console.log(datosTabla);
  //devuelve los datos para la tabla y grafica
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
        (a.cantidadNC <= 4 && b.cantidadNC > 4)
      ) {
        return -1;
      } else if (
        (a.descalificado && !b.descalificado) ||
        (a.cantidadNC > 4 && b.cantidadNC <= 4)
      ) {
        return 1;
      } else {
        return b.cantidadLitros - a.cantidadLitros;
      }
    });

  let totalLitrosVendidoMes = totalTabla
    .map((e) => e.cantidadLitros)
    .reduce((a, b) => new Decimal(Number(a)).plus(Number(b)).toFixed(2)); //error con muneros solucionado con string o fixed metodos

  let datosBar = {
    labels: totalTabla.map((e) => e.nombre),
    dataset: [
      {
        data: totalTabla.map((e) => e.cantidadLitros),
        backgroundColor: totalTabla.map((e, index) => {
          if (index < 4) {
            return colores[index];
          } else if (e.descalificado || e.cantidadNC > 4) {
            return "rgba(202,202,202,1)";
          } else {
            return colores[4];
          }
        }),
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
      <h4>Vista detallado</h4>

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
                  <th key={e}>Litros vendidos</th>
                  <th key={i}>Salidas no conformes</th>
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
      {/* Tabla con total vendido al mes */}
      <div className="d-flex justify-content-evenly container-fluid border-top border-bottom mt-3 mb-3 align-items-center ">
        <div className="mt-3">
          <table className="table table-bordered border-dark align-middle text-center">
            <tbody>
              <tr>
                <th scope="col">Total de litros de combustible vendido</th>
                <td>{totalLitrosVendidoMes} L</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="container-fluid    mt-3">
        <div className="container mt-3">
          <table
            className="table table-bordered border-dark align-middle text-center"
            id="tabla"
          >
            <thead>
              <tr>
                <th scope="col">Nombre de los despachadores</th>
                <th scope="col">Total de litros vendidos</th>
                <th scope="col">Total de salidas no conformes</th>
              </tr>
            </thead>
            <tbody>
              {totalTabla.map((e, index) => {
                return (
                  <tr
                    style={
                      index < 4
                        ? { backgroundColor: colores[index] }
                        : e.descalificado || e.cantidadNC > 4
                        ? { backgroundColor: "#cacaca" }
                        : null
                    }
                  >
                    <td key={e.nombres}>{e.nombre}</td>
                    <td key={e.cantidadLitros}>{e.cantidadLitros} L</td>
                    <td key={e.cantidadNC}>
                      {e.descalificado
                        ? "Descalificado"
                        : e.cantidadNC > 4
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
                  if (index < 4) {
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
                      text: "Litros",
                      font: {
                        size: "20pt",
                      },
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
      {/* Termina tabla */}

      <PdfV2
        fechaInicio={fechaInicio}
        fechaFin={fechaFin}
        estacion={estacion}
        orientacion="portrait"
        tabla="tabla"
      />
    </div>
  );
};
export default RepOctanoso;

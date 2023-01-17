import Axios from "../../../../Caxios/Axios";
import useGetData from "../../../../hooks/useGetData";
import { Fragment, useState } from "react";
import HeaderComponents from "../../../../GUI/HeaderComponents";
import format from "../../../assets/format";
import Bar from "../../../charts/Bar";
import PdfGraficas from "../../../pdf_generador/PdfGraficas";
import Decimal from "decimal.js-light";
import IconComponents from "../../../assets/IconComponents";
import OffCanvasConfigIncumplimientos from "../../../assets/OffCanvasConfigIncumplientos";
import Loader from "../../../assets/Loader";

function RepAceitoso() {
  let colores = [
    "rgba(219,42,62,1)",
    "rgba(255,255,10,1)",
    "rgba(149,202,255,1)",
    "rgba(149,202,255,1)",
    "rgba(149,202,10,1)",
  ];

  const estaciones = useGetData("/estaciones-servicio");
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  const [estacion, setEstacion] = useState(null);
  const [datos, setDatos] = useState([]);

  const [datosTabla, setDatosTabla] = useState(null);
  const [error, setError] = useState(null);
  const [pendiente, setPendiente] = useState();

  const [showCanva, setShowCanva] = useState();
  const setShowCanvaOpen = () => setShowCanva(true);
  const setShowCanvaClose = () => setShowCanva(false);

  const changeFechaInicio = (e) => {
    setFechaInicio(e.target.value);
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const changeFechaFin = (e) => {
    setFechaFin(e.target.value);
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const changeEstacion = (e) => {
    setEstacion(e.target.value);
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };
  console.log(estacion);

  const enviar = (e) => {
    e.preventDefault();
    enviarDatos();
  };

  const enviarDatos = async () => {
    try {
      const req = await Axios.post("/aceitoso/obtener", datos);
      setDatosTabla(req);
      setError(null);
    } catch (error) {
      setError(error.response.data.msg);
    }
  };
  console.log(error);

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
      />
      <div className="container">
        <form onSubmit={enviar}>
          <div className="row">
            <div className="mb-3 col-3">
              <label>Selecciona una fecha de inicio</label>
              <input
                className="form-control"
                type="date"
                name="fechaInicio"
                onChange={changeFechaInicio}
                required
              />
            </div>
            <div className="mb-3 col-3">
              <label>Selecciona una fecha de fin</label>
              <input
                className="form-control"
                type="date"
                name="fechaFinal"
                onChange={changeFechaFin}
                required
              />
            </div>
            <div className="mb-3 col-3">
              <label>Selecciona una estacion</label>
              <select
                className="form-control"
                onChange={changeEstacion}
                name="idEstacionServicio"
                required
              >
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
            <button
              type="submit"
              className="btn btn-primary col-3 mb-3 m-auto"
              style={{ width: "100px" }}
            >
              Consultar
            </button>
          </div>
        </form>
      </div>
      <div>
        {!datosTabla ? (
          <h4>Selecciona un rango de fechas y una estacion...</h4>
        ) : error !== null ? (
          <h4>{error}</h4>
        ) : (
          <Correcto datosTabla={datosTabla} colores={colores} />
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

  console.log(totalTabla);
  let totalVendidoMes = totalTabla
    .map((e) => e.cantidadLitros)
    .reduce((a, b) => new Decimal(Number(a)).plus(Number(b)).toFixed(2)); //error con muneros solucionado con string o fixed metodos

  console.log(totalVendidoMes);

  let datosBar = {
    labels: totalTabla.map((e) => e.nombre),
    dataset: [
      {
        data: totalTabla.map((e) => e.cantidadLitros),
        backgroundColor: totalTabla.map((e, index) => {
          if (index < 4 && !e.descalificado) {
            return colores[index];
          } else if (e.descalificado || e.cantidadNC >= 3) {
            return "rgba(202,202,202,1)";
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
        {/* Tabla principal */}
        <h4>Vista general</h4>
        <div className="d-flex justify-content-evenly container-fluid border-top border-bottom mt-3 mb-3 align-items-center ">
          <div className="mt-3">
            <table className="table table-bordered border-dark align-middle text-center">
              <tbody>
                <tr>
                  <th scope="col" rowSpan={2}>
                    Total vendido en el mes
                  </th>
                  <th scope="col">$</th>
                </tr>
                <tr>
                  <td>{totalVendidoMes}</td>
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
                  if (index < 4) {
                    return (
                      <tr>
                        <td style={{ backgroundColor: colores[index] }}>
                          {index + 1}° lugar
                        </td>
                        <td>
                          $
                          {new Decimal(Number(e.cantidadLitros))
                            .times(
                              index === 0
                                ? 0.05
                                : index === 1
                                ? 0.04
                                : index === 2
                                ? 0.03
                                : 0.02
                            )
                            .toFixed(2)}
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
        <div className="container-fluid mt-3" id="render">
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
                        index < 4
                          ? { backgroundColor: colores[index] }
                          : e.descalificado || e.cantidadNC >= 3
                          ? { backgroundColor: "#cacaca" }
                          : null
                      }
                    >
                      <td>{e.nombre}</td>
                      <td>$ {e.cantidadLitros}</td>
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
          <div className="d-flex align-items-center mt-3">
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
              <Bar datos={datosBar} text="" />
            </div>
          </div>
        </div>
        <PdfGraficas />
      </div>
    </div>
  );
};

export default RepAceitoso;

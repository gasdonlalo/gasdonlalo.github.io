import { useState } from "react";
import HeaderComponents from "../../../../GUI/HeaderComponents";
import Bar from "../../../charts/Bar";
import Scale from "../../../charts/Scale";
import { useParams } from "react-router-dom";
import InputChangeMes from "../../../forms/InputChangeMes";
import InputChangeYear from "../../../forms/InputChangeYear";
import useGetData from "../../../../hooks/useGetData";
import format from "../../../assets/format";
// import PdfV2 from "../../../pdf_generador/PdfV2";

function GraficaOyLEmpleado() {
  const date = new Date();
  const timeSave = sessionStorage.getItem("tiempo");
  const dataTime = {
    year: timeSave ? JSON.parse(timeSave).year : date.getFullYear(),
    month: timeSave ? JSON.parse(timeSave).month : date.getMonth() + 1,
  };
  const [year, setYear] = useState(dataTime.year);
  const [month, setMonth] = useState(dataTime.month);
  const { idEmpleado } = useParams();

  const url = `/ordenLimpieza/${year}/${month}/${idEmpleado}`;
  const { data, error, isPending } = useGetData(url);

  const changeMes = (e) => {
    setMonth(e.target.value);
  };
  const changeYear = (e) => {
    setYear(e.target.value);
  };

  return (
    <div className="Main">
      <HeaderComponents
        urlBack="/despacho/orden-limpieza-isla/reporte"
        textUrlback="Regresar a reportes"
        title="Reportes de Orden y Limpieza de la Isla"
      ></HeaderComponents>
      <div className="container">
        <form>
          <div className="row">
            <div className="mb-3 col-6">
              <label>Mes</label>
              <InputChangeMes defaultMes={month} handle={changeMes} />
            </div>
            <div className="mb-3 col 6">
              <label>Año</label>
              <InputChangeYear defaultYear={year} handle={changeYear} />
            </div>
          </div>
        </form>
        <div>
          {!isPending && !error && <Success data={data.response.empleado} />}
        </div>
      </div>
    </div>
  );
}

const Success = ({ data }) => {
  const { nombre, apellido_paterno, apellido_materno, evaluaciones } = data;
  const getQna = (fecha) => (new Date(fecha).getDate() < 15 ? "Qna1" : "Qna2");
  const cumplimientos = useGetData(`/ordenLimpieza/cumplimientos`);
  let dataAco = [];
  if (!cumplimientos.isPending && !cumplimientos.error) {
    cumplimientos.data.response.forEach((el) => {
      let ev = evaluaciones.map(
        (a, i) =>
          evaluaciones[i].filter(
            (b) => b.idoyl_cumplimiento === el.idoyl_cumplimiento
          )[0]
      );
      dataAco.push({
        idoyl_cumplimiento: el.idoyl_cumplimiento,
        cumplimiento: el.cumplimiento,
        ev,
      });
    });
  }

  let dataBar = {},
    dataScale = {};
  if (dataAco.length > 0) {
    dataBar = {
      labels: cumplimientos.data.response.map((el) =>
        el.cumplimiento.split(/\s(?=\w{4,10})/)
      ),
      dataset: [
        {
          data: dataAco.map((el) =>
            el.ev
              .map((a) => (a ? (a.cumple ? 1 : 0) : 1))
              .reduce((a, b) => a + b, 0)
          ),
          label: "Total",
          backgroundColor: "rgba(117, 226, 25, 1)",
        },
      ],
    };

    dataScale = {
      labels: cumplimientos.data.response.map((el) =>
        el.cumplimiento.split(/\s(?=\w{4,10})/)
      ),
      datasets: [
        {
          data: dataAco.map((el) =>
            el.ev
              .map((a) => (a ? (a.cumple ? 0 : 1) : 0))
              .reduce((a, b) => a + b, 0)
          ),
          backgroundColor: "rgba(235, 35, 57, 1)",
          borderColor: "rgba(235, 35, 57, 1)",
        },
      ],
    };
  }

  return (
    <div>
      <div>
        <h3>
          Reportes de{" "}
          {format.formatTextoMayusPrimeraLetra(
            `${nombre} ${apellido_paterno} ${apellido_materno}`
          )}
        </h3>
        <p>Evaluaciones capturadas en el mes: {evaluaciones.length}</p>
      </div>
      <div>
        {evaluaciones.length > 0 && (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th rowSpan={2} className="align-middle text-center">
                  Cumplimiento
                </th>
                {evaluaciones.map((el, i) => (
                  <th key={i} className="text-center position-relative">
                    {getQna(el[0].fecha)}
                    {evaluaciones[i][0].incidentes && (
                      <span
                        className="position-absolute top-0 end-0 text-white bg-danger m-1 px-1 rounded"
                        title={evaluaciones[i][0].incidentes}
                      >
                        !
                      </span>
                    )}
                  </th>
                ))}
              </tr>
              <tr>
                {evaluaciones.map((el, i) => (
                  <td key={i} className="text-center">
                    {format.formatFechaComplete(el[0].fecha)}
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              {!cumplimientos.error &&
                !cumplimientos.isPending &&
                dataAco.map((el) => (
                  <tr key={el.idoyl_cumplimiento}>
                    <th>{el.cumplimiento}</th>
                    {el.ev.map((a, i) => (
                      <td
                        key={i}
                        className={`text-center text-${
                          a ? (a.cumple ? "success" : "danger") : "success"
                        }`}
                      >
                        {a ? (a.cumple ? 1 : 0) : "No aplica"}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
      {dataAco.length > 0 && (
        <>
          <div>
            <Bar
              datos={dataBar}
              legend={false}
              text={`Orden y limpieza ${format.formatTextoMayusPrimeraLetra(
                `${nombre} ${apellido_paterno} ${apellido_materno}`
              )}`}
              optionsCustom={{
                scales: {
                  y: {
                    title: {
                      display: true,
                      text: "Cantidad de puntos obtenidos",
                      font: {
                        size: 20,
                        weight: "600",
                      },
                    },
                    ticks: {
                      stepSize: 1,
                    },
                  },
                  x: {
                    title: {
                      display: true,
                      text: "Reglamentos",
                      font: {
                        size: 20,
                        weight: "600",
                      },
                    },
                  },
                },
              }}
            />
          </div>
          <div>
            <Scale
              data={dataScale}
              legend={false}
              text={`Orden y limpieza ${format.formatTextoMayusPrimeraLetra(
                `${nombre} ${apellido_paterno} ${apellido_materno}`
              )}`}
              optionsCustom={{
                scales: {
                  y: {
                    title: {
                      display: true,
                      text: "Cantidad de puntos no obtenidos",
                      font: {
                        size: 20,
                        weight: "600",
                      },
                    },
                    ticks: {
                      stepSize: 1,
                    },
                  },
                  x: {
                    title: {
                      display: true,
                      text: "Reglamentos",
                      font: {
                        size: 20,
                        weight: "600",
                      },
                    },
                  },
                },
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default GraficaOyLEmpleado;

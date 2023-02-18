import { Fragment, useState } from "react";
import useGetData from "../../../hooks/useGetData";
import InputChangeMes from "../../forms/InputChangeMes";
import InputChangeYear from "../../forms/InputChangeYear";
import format from "../../assets/format";
import Scale from "../../charts/Scale";
import Loader from "../../assets/Loader";
import PdfV2 from "../../pdf_generador/PdfV2";
import HeaderComponents from "../../../GUI/HeaderComponents";

const { formatMes, obtenerDiaMes } = format;

const SalidaNoConformeGraficaMensual = () => {
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth() + 1);

  const sn = useGetData(`/salida-no-conforme/semanas/${year}/${month}`);

  const handleMonth = (e) => setMonth(e.target.value);
  const handleYear = (e) => setYear(e.target.value);

  return (
    <div className="Main">
      <HeaderComponents
        title="Reportes mensuales SNC"
        urlBack="../files"
      ></HeaderComponents>
      <div className="row w-75 mx-auto mt-4">
        <div className="col-md-6">
          <InputChangeMes defaultMes={month} handle={handleMonth} />
        </div>
        <div className="col-md-6">
          <InputChangeYear defaultYear={year} handle={handleYear} />
        </div>
      </div>
      {!sn.error && !sn.isPending && (
        <Success data={sn.data.response} year={year} month={month} />
      )}
      {sn.isPending && <Loader />}
    </div>
  );
};

const Success = ({ data, year, month }) => {
  const totalSalidasNC = data
    .map((el) => {
      let suma = el.map((sm) => sm.total).reduce((a, b) => a + b);
      return suma;
    })
    .reduce((a, b) => a + b);

  const dataScale = {
    labels: data.map((el) => el[0].nombre_completo),
    datasets: [
      {
        label: "empleados",
        data: data.map((el) =>
          el.map((sm) => sm.total).reduce((a, b) => a + b)
        ),
        borderColor: "rgba(50,179,17,1)",
        backgroundColor: "rgba(50,179,17,1)",
      },
    ],
  };

  return (
    <Fragment>
      <div className="container">
        <div className="mt-5">
          <table id="tabla">
            <thead className="border">
              <tr>
                <th rowSpan={2} className="border px-2">
                  Nombre completo despachador
                </th>
                {data[0].map((el, i) => (
                  <td
                    key={i}
                    className="border-end text-center fw-semibold px-2"
                  >
                    SNC
                  </td>
                ))}
                <td className="px-2 fw-bold" rowSpan={2}>
                  Total
                </td>
              </tr>
              <tr>
                {data[0].map((el, i) => (
                  <td
                    key={i}
                    className="border-end text-center fw-semibold px-2"
                  >
                    {obtenerDiaMes(el.diaEmpiezo)} al{" "}
                    {obtenerDiaMes(el.diaTermino)} de {formatMes(el.diaEmpiezo)}
                  </td>
                ))}
                <td></td>
              </tr>
            </thead>
            <tbody>
              {data.map((el, i) => (
                <tr key={i} className="border">
                  <td className="border p-1">{el[0].nombre_completo}</td>

                  {data[i].map((sm) => (
                    <td className="border text-center">{sm.total}</td>
                  ))}
                  <td className="fw-semibold text-center">
                    {data[i].map((sm) => sm.total).reduce((a, b) => a + b)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border mt-2 p-1" style={{ width: "min-content" }}>
          <span className="text-nowrap">
            <span className="fw-bold">
              Total salidas no conformes del mes:{" "}
            </span>{" "}
            <span className="fw-semibold text-danger">{totalSalidasNC}</span>
          </span>
        </div>
        <div id="render" className="mt-5">
          <Scale
            data={dataScale}
            text={`Salidas no conformes del mes de ${format.formatMes(
              `${year}-${month}-01`
            )}`}
            legend={false}
            optionsCustom={{
              scales: {
                y: {
                  min: 0,
                  title: {
                    display: true,
                    text: "Cantidad",
                    font: {
                      size: "20px",
                    },
                  },
                  ticks: {
                    stepSize: 1,
                  },
                },
                x: {
                  title: {
                    display: true,
                    text: "Despachadores",
                    font: {
                      size: "20px",
                    },
                  },
                },
              },
            }}
          />
        </div>
      </div>
      <div>
        <PdfV2 year={year} month={month} tabla="tabla" />
      </div>
    </Fragment>
  );
};

export default SalidaNoConformeGraficaMensual;

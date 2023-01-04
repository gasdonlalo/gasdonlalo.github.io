import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import useGetData from "../../../hooks/useGetData";
import InputChangeMes from "../../forms/InputChangeMes";
import InputChangeYear from "../../forms/InputChangeYear";
import format from "../../assets/format";
import Scale from "../../charts/Scale";
import Loader from "../../assets/Loader";
import PdfGraficas from "../../pdf_generador/PdfGraficas";

const { formatMes, obtenerDiaMes } = format;

const SalidaNoConformeGraficaMensual = () => {
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth() + 1);

  const sn = useGetData(`/salida-no-conforme/semanas/${year}/${month}`);

  console.log(sn);

  const handleMonth = (e) => setMonth(e.target.value);
  const handleYear = (e) => setYear(e.target.value);

  return (
    <div className="Main">
      <Link className="link-primary" to="/despacho/salida-no-conforme-files">
        Volver al despacho
      </Link>
      <h3 className="border-bottom">Reporte mensual salidas no conformes</h3>
      <div className="row w-75 mx-auto">
        <div className="col-md-6">
          <InputChangeMes defaultMes={month} handle={handleMonth} />
        </div>
        <div className="col-md-6">
          <InputChangeYear defaultYear={year} handle={handleYear} />
        </div>
        {!sn.error && !sn.isPending && <Success data={sn.data.response} />}
        {sn.isPending && <Loader />}
      </div>
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

  console.log(dataScale);

  return (
    <Fragment>
      <div id="render">
        <div className="mt-5">
          <table>
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
        <div>
          <Scale data={dataScale} legend={false} />
        </div>
      </div>
      <div>
        <PdfGraficas year={year} mes={month} anchografica="45%" />
      </div>
    </Fragment>
  );
};

export default SalidaNoConformeGraficaMensual;

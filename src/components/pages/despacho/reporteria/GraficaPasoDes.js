import { Fragment, useState } from "react";
import HeaderComponents from "../../../../GUI/HeaderComponents";
import useGetData from "../../../../hooks/useGetData";
import InputSelectEmpleado from "../../../forms/InputSelectEmpleado";
import InputChangeYear from "../../../forms/InputChangeYear";
import InputChangeMes from "../../../forms/InputChangeMes";
import Loader from "../../../assets/Loader";
import ErrorHttp from "../../../assets/ErrorHttp";
import Bar from "../../../charts/Bar";
import PdfV2 from "../../../pdf_generador/PdfV2";
import IconComponents from "../../../assets/IconComponents";

const GraficaPasoDes = () => {
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth() + 1);
  const [idEmpleado, setIdEmpleado] = useState(null);
  const [qna, setQna] = useState("");
  const evaluacion = useGetData(
    `/pasos-despachar/${year}/${month}/${idEmpleado}/${qna}`
  );
  const despachador = useGetData("/empleado?departamento=1");
  const changeDespachador = (e) => setIdEmpleado(e.target.value);
  const changeYear = (e) => setYear(e.target.value);
  const changeMonth = (e) => setMonth(e.target.value);
  const handleQna = (e) => setQna(Number(e.target.value) || "");

  return (
    <div className="Main">
      <HeaderComponents
        urlBack="/despacho"
        textUrlback="Regresar a despacho"
        title="Evaluaciones de despacho"
      >
        <div className="d-flex">
          <IconComponents
            icon="list-check text-info"
            url="/despacho/pasos-despachar"
            text="Evaluar"
          />
          <IconComponents
            icon="file-lines text-warning"
            url="../pasos-despachar/historial"
            text="Registros"
          />
        </div>
      </HeaderComponents>
      <div className="w-75 m-auto row">
        <div className="col-md-3">
          <label className="form-label">Selecciona la quincena</label>
          <select className="form-select" onChange={handleQna}>
            <option value="">Todo el mes</option>
            <option value="1">Primer Quincena</option>
            <option value="2">Segunda Quincena</option>
          </select>
        </div>
        <div className="col-md-5">
          <label className="form-label">Selecciona el empleado</label>
          {!despachador.error && !despachador.isPending && (
            <InputSelectEmpleado
              defaultValue={idEmpleado}
              empleados={despachador.data.response}
              handle={changeDespachador}
            />
          )}
          {despachador.isPending && (
            <label className="form-label text-danger">
              Cargando empleados ...
            </label>
          )}
        </div>
        <div className="col-md-2">
          <label className="form-label">Selecciona el mes</label>
          <InputChangeMes handle={changeMonth} defaultMes={month} />
        </div>
        <div className="col-md-2">
          <label className="form-label">Selecciona el año</label>
          <InputChangeYear handle={changeYear} defaultYear={year} />
        </div>
      </div>
      {!evaluacion.error && !evaluacion.isPending && (
        <Success
          data={evaluacion.data.response}
          year={year}
          month={month}
          idEmpleado={idEmpleado}
          qna={qna}
        />
      )}
      {evaluacion.error && !evaluacion.isPending && (
        <div className="mt-5">
          {" "}
          <ErrorHttp />
        </div>
      )}
      {evaluacion.isPending && <Loader />}
    </div>
  );
};

const Success = ({ data, year, month, idEmpleado, qna }) => {
  const pasos = useGetData(`/pasos-despachar/get-pasos`);
  const sum = (arr) => {
    return arr
      .map((el) =>
        el.map((sa) => (sa.evaluacion ? 1 : 0)).reduce((a, b) => a + b, 0)
      )
      .reduce((a, b) => a + b, 0);
  };

  let dataBar;
  let dataBarPasos;
  if (!pasos.error && !pasos.isPending) {
    if (!qna) {
      const qna1 = data.filter((el) => el[0].quincena === 1);
      const qna2 = data.filter((el) => el[0].quincena === 2);
      dataBar = {
        labels: ["Qna 1", "Qna 2"],
        dataset: [
          {
            data: [
              (sum(qna1) / qna1.length).toFixed(2) || 0,
              (sum(qna2) / qna2.length).toFixed(2) || 0,
            ],
            backgroundColor: ["orange", "red"],
          },
        ],
        text: "Promedio mensual",
      };
    } else {
      dataBar = {
        labels: ["Promedio"],
        dataset: [
          {
            data: [(sum(data) / data.length).toFixed(2)],
            backgroundColor: "orange",
          },
        ],
        text: `Promedio quincena ${qna}`,
      };

      dataBarPasos = {
        labels: data[0].map((el, i) => `P${i}`),
        dataset: [
          {
            data: pasos.data.response.map((el, i) =>
              (
                (data
                  .map((ev) => (ev[i].evaluacion ? 1 : 0))
                  .reduce((a, b) => a + b, 0) /
                  data.length) *
                10
              ).toFixed(2)
            ),
            backgroundColor: "red",
          },
        ],
      };
    }
  }

  console.log(dataBarPasos);

  const sumaTotal = sum(data);
  const PromedioTotal = sumaTotal / data.length;

  return (
    <Fragment>
      <div id="render">
        <div>
          <table className="mt-4 mx-auto">
            <thead>
              <tr>
                <th className="border text-center">Evaluación</th>
                {!pasos.error &&
                  !pasos.isPending &&
                  pasos.data.response.map((el, i) => (
                    <td
                      className="border text-center p-2 fw-semibold"
                      style={{ width: "100px" }}
                      key={el.idpaso_despachar}
                    >
                      {el.paso} (P{i})
                    </td>
                  ))}
                <th className="border px-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {data.map((el, i, arr) => (
                <tr key={i}>
                  <td className="text-center px-4 border">
                    Evaluación {i + 1}
                  </td>
                  {arr[i].map((ev) => (
                    <td
                      key={ev.idevaluacion_despachar}
                      className="text-center border"
                    >
                      {ev.evaluacion ? "1" : "0"}
                    </td>
                  ))}
                  <td className="border text-center fw-semibold">
                    {data[i]
                      .map((el) => (el.evaluacion ? 1 : 0))
                      .reduce((a, b) => a + b, 0)}
                  </td>
                </tr>
              ))}
              <tr className="bg-secondary">
                <td className=" text-center">Total</td>
                {!pasos.error &&
                  !pasos.isPending &&
                  pasos.data.response.map((el, i) => (
                    <td key={i} className=" text-center">
                      {data
                        .map((ev) => (ev[i].evaluacion ? 1 : 0))
                        .reduce((a, b) => a + b)}
                    </td>
                  ))}
                <td className="fw-semibold text-center">{sumaTotal}</td>
              </tr>
              <tr className="bg-info">
                <td className=" text-center">Promedio</td>
                {!pasos.error &&
                  !pasos.isPending &&
                  pasos.data.response.map((el, i) => (
                    <td key={i} className=" text-center">
                      {(
                        (data
                          .map((ev) => (ev[i].evaluacion ? 1 : 0))
                          .reduce((a, b) => a + b) /
                          data.length) *
                        10
                      ).toFixed(2)}
                    </td>
                  ))}
                <td className="fw-bold text-white bg-danger text-center">
                  {PromedioTotal.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {!pasos.error && !pasos.isPending && (
          <div
            className={`d-flex ${
              qna ? "justify-content-evenly" : "w-50 mx-auto"
            }`}
          >
            <div className={qna ? "w-50" : "w-100"}>
              <Bar datos={dataBar} text={dataBar.text} legend={false} />
            </div>

            {qna && (
              <div className="w-50">
                <Bar
                  datos={dataBarPasos}
                  text={"Promedio por pasos"}
                  legend={false}
                />
              </div>
            )}
          </div>
        )}
      </div>
      <div>
        <PdfV2 year={year} month={month} idempleado={idEmpleado} />
      </div>
    </Fragment>
  );
};

export default GraficaPasoDes;

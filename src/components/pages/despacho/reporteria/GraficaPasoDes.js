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
import Decimal from "decimal.js-light";

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

  let limitQna1,
    limitQna2,
    mapQna1 = [],
    mapQna2 = [],
    proMapM,
    proM,
    dataBar = {},
    dataBarP = {},
    customBar = {
      scales: {
        y: {
          min: 0,
          max: 10,
        },
      },
    };

  if (!pasos.error && !pasos.isPending) {
    if (!qna) {
      limitQna1 = data.filter((el) => el.qna === 1);
      limitQna2 = data.filter((el) => el.qna === 2);
      let pro1 = limitQna1.length > 0 ? limitQna1[0].promedio : 0;
      let pro2 = limitQna2.length > 0 ? limitQna2[0].promedio : 0;
      proM = new Decimal(pro1).add(pro2).toNumber() / 2;

      if (limitQna1.length > 0) {
        mapQna1 = pasos.data.response.map((el, i) =>
          Number(
            (
              (limitQna1
                .map((ev) => (ev.data[i].evaluacion ? 1 : 0))
                .reduce((a, b) => a + b, 0) /
                limitQna1.length) *
              10
            ).toFixed(2)
          )
        );
      }
      if (limitQna2.length > 0) {
        mapQna2 = pasos.data.response.map((el, i) =>
          Number(
            (
              (limitQna2
                .map((ev) => (ev.data[i].evaluacion ? 1 : 0))
                .reduce((a, b) => a + b, 0) /
                limitQna2.length) *
              10
            ).toFixed(2)
          )
        );
      }

      if (limitQna1.length > 0 || limitQna2.length > 0) {
        proMapM = [];
        for (let i = 0; i < 9; i++) {
          let first = mapQna1.length > 0 ? mapQna1[i] : 0;
          let second = mapQna2.length > 0 ? mapQna2[i] : 0;
          let pro = new Decimal(first).add(second).toNumber() / 2;
          proMapM.push(pro);
        }
      }
      dataBarP = {
        labels: proMapM.map((el, i) => `P${i}`),
        text: "Promedio Pasos Mensual",
        dataset: [
          {
            data: proMapM.map((el) => el.toFixed(2)),
          },
        ],
      };

      dataBar = {
        labels: ["Qna1", "Qna2"],
        text: "Promedio Mensual",
        dataset: [
          {
            data: [pro1.toFixed(2), pro2.toFixed(2)],
            backgroundColor: ["#ff0000", "orange"],
          },
        ],
      };
    } else {
      dataBar = {
        labels: ["Promedio Obtenido"],
        text: `Promedio Qna ${qna}`,
        dataset: [
          {
            data: [data[0].promedio.toFixed(2)],
            backgroundColor: data[0].qna > 1 ? "orange" : "red",
          },
        ],
      };

      dataBarP = {
        labels: pasos.data.response.map((el, i) => `P${i}`),
        text: `Promedio Pasos Qna ${qna}`,
        dataset: [
          {
            data: pasos.data.response.map((el, j) =>
              (
                (data
                  .map((sel) => (sel.data[j].evaluacion ? 1 : 0))
                  .reduce((a, b) => a + b, 0) /
                  data.length) *
                10
              ).toFixed(2)
            ),
          },
        ],
      };
    }
  }

  return (
    <Fragment>
      <div id="render">
        <div>
          <table className="mt-4 mx-auto">
            <thead>
              <tr>
                <th className="border text-center">
                  {qna ? "Evaluación" : "Quincena"}
                </th>
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
              {!qna && !pasos.error && !pasos.isPending && (
                <>
                  {limitQna1.length > 0 && (
                    <tr className="bg-secondary text-white">
                      <td className=" text-center px-2">1er quincena</td>
                      {mapQna1.map((el, i) => (
                        <td key={i} className="text-center">
                          {el.toFixed(2)}
                        </td>
                      ))}
                      <td className="fw-semibold text-white bg-danger text-center">
                        {limitQna1[0].promedio.toFixed(2)}
                      </td>
                    </tr>
                  )}
                  {limitQna2.length > 0 && (
                    <tr className="bg-secondary text-white">
                      <td className=" text-center px-2">2da quincena</td>
                      {mapQna2.map((el, i) => (
                        <td key={i} className="text-center">
                          {el.toFixed(2)}
                        </td>
                      ))}
                      <td className="fw-semibold text-white bg-danger text-center">
                        {limitQna2[0].promedio.toFixed(2)}
                      </td>
                    </tr>
                  )}
                  <tr className="bg-info">
                    <td className="text-center fw-semibold">Promedio</td>
                    {proMapM.map((el, i) => (
                      <td key={i} className="text-center">
                        {el.toFixed(2)}
                      </td>
                    ))}
                    <td className="fw-bold text-white bg-danger text-center">
                      {proM.toFixed(2)}
                    </td>
                  </tr>
                </>
              )}
              {qna && (
                <>
                  {data.map((el, i, arr) => (
                    <tr key={i}>
                      <td className="text-center px-4 border">
                        Evaluación {i + 1}
                      </td>
                      {arr[i].data.map((ev, j) => (
                        <td key={j} className="text-center border">
                          {ev.evaluacion ? "1" : "0"}
                        </td>
                      ))}
                      <td className="border text-center fw-semibold">
                        {el.total}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-secondary text-white">
                    <td className=" text-center">Total</td>
                    {!pasos.error &&
                      !pasos.isPending &&
                      pasos.data.response.map((el, i) => (
                        <td key={i} className=" text-center">
                          {data
                            .map((ev) => (ev.data[i].evaluacion ? 1 : 0))
                            .reduce((a, b) => a + b)}
                        </td>
                      ))}
                    <td className="fw-semibold text-center">
                      {data.map((el) => el.total).reduce((a, b) => a + b)}
                    </td>
                  </tr>
                  <tr className="bg-info">
                    <td className=" text-center">Promedio</td>
                    {!pasos.error &&
                      !pasos.isPending &&
                      pasos.data.response.map((el, i) => (
                        <td key={i} className=" text-center">
                          {(
                            (data
                              .map((ev) => (ev.data[i].evaluacion ? 1 : 0))
                              .reduce((a, b) => a + b) /
                              data.length) *
                            10
                          ).toFixed(2)}
                        </td>
                      ))}
                    <td className="fw-bold text-white bg-danger text-center">
                      {data[0].promedio.toFixed(2)}
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
        {!pasos.error && !pasos.isPending && (
          <div className="d-flex justify-content-evenly">
            <div className="w-50">
              <Bar
                datos={dataBar}
                text={dataBar.text}
                legend={false}
                optionsCustom={customBar}
              />
            </div>

            <div className="w-50">
              <Bar
                datos={dataBarP}
                text={dataBarP.text}
                legend={false}
                optionsCustom={customBar}
              />
            </div>
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

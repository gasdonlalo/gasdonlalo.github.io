import { useState } from "react";
import { Link } from "react-router-dom";
import useGetData from "../../../../hooks/useGetData";
import InputSelectEmpleado from "../../../forms/InputSelectEmpleado";
import InputChangeYear from "../../../forms/InputChangeYear";
import InputChangeMes from "../../../forms/InputChangeMes";
import Loader from "../../../assets/Loader";
import ErrorHttp from "../../../assets/ErrorHttp";
import Bar from "../../../charts/Bar";
import PdfGraficas from "../../../pdf_generador/PdfGraficas";

const GraficaPasoDes = () => {
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth() + 1);
  const [quincena, setQuincena] = useState(1);
  const [idEmpleado, setIdEmpleado] = useState(null);
  const evaluacion = useGetData(
    `/pasos-despachar/${year}/${month}/${quincena}/${idEmpleado}`
  );
  const despachador = useGetData("/empleado?departamento=1");
  const changeDespachador = (e) => setIdEmpleado(e.target.value);
  const changeYear = (e) => setYear(e.target.value);
  const changeMonth = (e) => setMonth(e.target.value);
  const handleQuincena = (e) => setQuincena(e.target.value);
  return (
    <div className="Main">
      <Link className="link-primary" to="/despacho">
        Volver al despacho
      </Link>
      <div>
        <h3 className="border-bottom">Evaluacion de despacho</h3>
      </div>
      <div className="w-75 m-auto row">
        <div className="col-md-3">
          <label className="form-label">Selecciona la quincena</label>
          <select
            className="form-select"
            onChange={handleQuincena}
            defaultValue={1}
          >
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
          quincena={quincena}
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

const Success = ({ data, year, month, idEmpleado, quincena }) => {
  const pasosDes = useGetData("/pasos-despachar/get-pasos");
  const promedios = useGetData(
    `/pasos-despachar/quincenas/${year}/${month}/${idEmpleado}`
  );

  const sacarPromedio = (pro) => {
    let promedio;
    let total;
    if (pro.length > 0) {
      total = pro.map((el) => (el.evaluacion ? 1 : 0)).reduce((a, b) => a + b);
      promedio = (total / pro.length) * 100;
    } else {
      promedio = 0;
    }
    return { promedio, total };
  };

  let promedio = {};
  let dataBarPromedioQuincena = {};
  let dataBarPromedio = {};

  if (!promedios.isPending && !promedios.error) {
    promedio.quin1 = sacarPromedio(promedios.data.response.quincena1).promedio;
    promedio.quin1Suma = sacarPromedio(promedios.data.response.quincena1).total;
    promedio.quin2 = sacarPromedio(promedios.data.response.quincena2).promedio;
    promedio.quin2Suma = sacarPromedio(promedios.data.response.quincena2).total;
    dataBarPromedioQuincena = {
      labels: [
        ["Promedio", "Quincena 1"],
        ["Promedio", "Quincena 2"],
      ],
      dataset: [
        {
          data: [promedio.quin1, promedio.quin2],
          label: "Diciembre",
          backgroundColor: "rgba(237,50,5,1)",
        },
      ],
    };
  }

  if (!pasosDes.isPending && !pasosDes.error) {
    pasosDes.data.response.forEach((el, i) => {
      data.evaluaciones.map((es) => ({
        idpaso: es[i].idpaso_despachar,
      }));
    });
    dataBarPromedio = {
      labels: pasosDes.data.response.map((el) => el.paso),
      dataset: [
        {
          data: pasosDes.data.response.map((el, i) => {
            let total = data.evaluaciones
              .map((es) => (es[i].evaluacion ? 1 : 0))
              .reduce((a, b) => a + b);
            let promedio = (total / data.evaluaciones.length) * 10;
            console.log(total / data.evaluaciones.length);
            return promedio.toFixed(2);
          }),
          label: "recurso",
        },
      ],
    };
    console.log(dataBarPromedio.dataset, pasosDes.data.response.length);
  }

  return (
    <div id="render">
      <div>
        <table className="mt-4 mx-auto">
          <thead>
            <tr>
              <th className="border text-center">Evaluación</th>
              {!pasosDes.error &&
                !pasosDes.isPending &&
                pasosDes.data.response.map((el) => (
                  <td
                    className="border text-center p-2 fw-semibold"
                    style={{ width: "100px" }}
                    key={el.idpaso_despachar}
                  >
                    {el.paso}
                  </td>
                ))}
              <th className="border px-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.evaluaciones.map((el, i) => (
              <tr key={i}>
                <td className="text-center px-4 border">Evaluación {i + 1}</td>
                {data.evaluaciones[i].map((ev) => (
                  <td
                    key={ev.idevaluacion_despachar}
                    className="text-center border"
                  >
                    {ev.evaluacion ? "1" : "0"}
                  </td>
                ))}
                <td className="border text-center fw-semibold">
                  {data.evaluaciones[i]
                    .map((el) => (el.evaluacion ? 1 : 0))
                    .reduce((a, b) => a + b, 0)}
                </td>
              </tr>
            ))}
            <tr className="bg-secondary">
              <td className=" text-center">Total</td>
              {!pasosDes.isPending &&
                !pasosDes.error &&
                pasosDes.data.response.map((el, i) => (
                  <td key={i} className=" text-center">
                    {data.evaluaciones
                      .map((ev) => (ev[i].evaluacion ? 1 : 0))
                      .reduce((a, b) => a + b)}
                  </td>
                ))}
              <td className="fw-semibold text-center">
                {promedio[`quin${quincena}Suma`]}
              </td>
            </tr>
            <tr className="bg-info">
              <td className=" text-center">Promedio</td>
              {!pasosDes.isPending &&
                !pasosDes.error &&
                pasosDes.data.response.map((el, i) => (
                  <td key={i} className=" text-center">
                    {(
                      (data.evaluaciones
                        .map((ev) => (ev[i].evaluacion ? 1 : 0))
                        .reduce((a, b) => a + b) /
                        data.evaluaciones.length) *
                      10
                    ).toFixed(2)}
                  </td>
                ))}
              <td className="fw-bold text-white bg-danger text-center">
                {Number(promedio[`quin${quincena}`]).toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {!promedios.error && !promedios.isPending && (
        <div className="">
          <div className="mt-5 d-flex" style={{ flexGrow: "2" }}>
            <table className="table table-bordered w-25 text-center m-auto">
              <thead>
                <tr>
                  <th className="text-nowrap">Promedio quincena 1</th>
                  <th className="text-nowrap">Promedio quincena 2</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{promedio.quin1.toFixed(2)}</td>
                  <td>{promedio.quin2.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-evenly">
            <div className="w-50">
              <Bar
                datos={dataBarPromedioQuincena}
                text="Promedio"
                y={[80, 100]}
                legend={false}
              />
            </div>
            <div className="w-50">
              <Bar
                datos={dataBarPromedio}
                text="Promedio por pasos"
                legend={false}
              />
            </div>
          </div>
        </div>
      )}
      <div>
        <PdfGraficas year={year} mes={month} idempleado={idEmpleado} />
      </div>
    </div>
  );
};

export default GraficaPasoDes;

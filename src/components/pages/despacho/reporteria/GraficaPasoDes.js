import { useState } from "react";
import { Link } from "react-router-dom";
import useGetData from "../../../../hooks/useGetData";
import InputSelectEmpleado from "../../../forms/InputSelectEmpleado";
import InputChangeYear from "../../../forms/InputChangeYear";
import InputChangeMes from "../../../forms/InputChangeMes";
import Loader from "../../../assets/Loader";
import ErrorHttp from "../../../assets/ErrorHttp";

const GraficaPasoDes = () => {
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth() + 1);
  const [quincena, setQuincena] = useState(1);
  const [idEmpleado, setIdEmpleado] = useState(2);
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
        <Success data={evaluacion.data.response} />
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

const Success = ({ data }) => {
  const pasosDes = useGetData("/pasos-despachar/get-pasos");
  console.log({ data: data.evaluaciones });
  return (
    <div>
      <div>
        <table className="mt-4 mx-auto">
          <thead>
            <tr>
              <th className="border text-center">Evaluación</th>
              {!pasosDes.error &&
                !pasosDes.isPending &&
                pasosDes.data.response.map((el) => (
                  <th
                    className="border text-center p-2"
                    style={{ width: "100px" }}
                    key={el.idpaso_despachar}
                  >
                    {el.paso}
                  </th>
                ))}
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GraficaPasoDes;

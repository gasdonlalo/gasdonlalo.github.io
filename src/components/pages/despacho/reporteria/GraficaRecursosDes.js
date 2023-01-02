import { useState } from "react";
import { Link } from "react-router-dom";
import useGetData from "../../../../hooks/useGetData";
import InputSelectEmpleado from "../../../forms/InputSelectEmpleado";
import InputChangeYear from "../../../forms/InputChangeYear";
import InputChangeMes from "../../../forms/InputChangeMes";
import Loader from "../../../assets/Loader";
import ErrorHttp from "../../../assets/ErrorHttp";
import Scale from "../../../charts/Scale";

const GraficaRecursosDes = () => {
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth() + 1);
  const [quincena, setQuincena] = useState(1);
  const [idEmpleado, setIdEmpleado] = useState(null);
  const despachador = useGetData("/empleado?departamento=1");
  const recursos = useGetData(
    `lista-recurso-despachador/quincena/${year}/${month}/${idEmpleado}/${quincena}`
  );
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
        <h3 className="border-bottom">Reporte de recursos de despachador</h3>
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
      {!recursos.error && !recursos.isPending && (
        <Success recursos={recursos.data.response} />
      )}
      {recursos.error && !recursos.isPending && (
        <div className="mt-5">
          <ErrorHttp />
        </div>
      )}
      {recursos.isPending && <Loader />}
    </div>
  );
};

const Success = ({ recursos }) => {
  console.log(recursos);
  let dataBar = {
    labels: recursos.map((el) => el.recurso),
    dataset: [
      {
        data: recursos.map((el) => (el.evaluacion ? 1 : 0)),
        label: "re",
      },
    ],
  };
  console.log(dataBar);
  return (
    <div className="mt-5">
      <table className="table table-bordered w-25">
        <thead>
          <tr>
            <th>Recurso</th>
            <th>Cumple</th>
          </tr>
        </thead>
        <tbody>
          {recursos.map((el) => (
            <tr key={el.idrecurso}>
              <td>{el.recurso}</td>
              <td className="text-center fw-bold">
                {el.evaluacion ? (
                  <span className="text-success">1</span>
                ) : (
                  <span className="text-danger">0</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-75">
        <Scale data={dataBar}></Scale>
      </div>
    </div>
  );
};
export default GraficaRecursosDes;

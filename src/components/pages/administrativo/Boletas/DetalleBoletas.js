import { useParams } from "react-router-dom";
import HeaderComponents from "../../../../GUI/HeaderComponents";
import { useState } from "react";
import InputChangeMes from "../../../forms/InputChangeMes";
import InputChangeYear from "../../../forms/InputChangeYear";
import useGetData from "../../../../hooks/useGetData";
import Loader from "../../../assets/Loader";

function DetalleBoletas() {
  const { id } = useParams();
  const date = new Date(
    new Date().getTime() + new Date().getTimezoneOffset() * 60000
  );
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth() + 1);
  const [quincena, setQuincena] = useState(date.getDate() < 16 ? 1 : 2);

  const { data, error, isPending } = useGetData(
    `/view/${id}?qna=${quincena}&mes=${month}&ano=${year}`
  );

  const handleYear = (e) => {
    setYear(e.target.value);
  };

  const handleMonth = (e) => {
    setMonth(e.target.value);
  };

  return (
    <div className="Main">
      {!isPending && !error && (
        <HeaderComponents
          urlBack="../"
          title={`Detalles de evaluaciones de ${data.response.nombre}`}
          textUrlback="Volver a lista de empleados"
        />
      )}
      {/* Selects */}
      <div className="row w-75 mx-auto mt-3">
        <div className="col-md-4">
          <label>Mes</label>
          <InputChangeMes defaultMes={month} handle={handleMonth} />
        </div>
        <div className="col-md-4">
          <label>Año</label>
          <InputChangeYear defaultYear={year} handle={handleYear} />
        </div>
        <div className="col-md-4">
          <label>Quincena</label>
          <select
            className="form-select"
            onChange={(e) => setQuincena(e.target.value)}
            defaultValue={quincena}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
          </select>
        </div>
      </div>
      {isPending && <Loader />}
      {!error && !isPending && (
        <Success datos={data} qna={quincena} idEmpleado={id} />
      )}
    </div>
  );
}
const Success = ({ datos, qna, idEmpleado }) => {
  return (
    <div className="container w-50">
      {/* Infor gral */}
      <table className="table table-bordered border-dark mt-3">
        <tbody>
          <tr>
            <th>ID EMPLEADO</th>
            <td>{idEmpleado}</td>
            <th>QUINCENA</th>
            <td>{qna}</td>
          </tr>
          <tr>
            <th>Nombre</th>
            <td colSpan={3}>{datos.response.nombre}</td>
          </tr>
          <tr>
            <th>Puesto</th>
            <td colSpan={3}>{datos.response.departamento}</td>
          </tr>
        </tbody>
      </table>
      {/* Colores */}
      <div className="d-flex justify-content-center gap-2">
        <div className="d-flex align-items-center gap-2">
          <div className="text-danger">
            <i className="bi bi-square-fill" />
          </div>
          No conforme
        </div>
        <div className="d-flex align-items-center gap-2">
          <div className="text-success">
            <i className="bi bi-square-fill" />
          </div>
          Conforme
        </div>
      </div>
      {/* Tabla */}
      <table className="table table-bordered text-center">
        <thead className="table-light">
          <tr>
            <th>Reglamento</th>
            <th>Resultado esperado</th>
            <th>Resultado obtenido</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Monto faltante</td>
            <td>Igual a $0.00</td>
            <td
              className={
                datos.response.mf > 0
                  ? "bg-danger bg-opacity-75"
                  : "bg-success bg-opacity-75"
              }
            >
              ${datos.response.mf}
            </td>
          </tr>
          <tr>
            <td>Checklist bomba</td>
            <td>12 registros</td>
            <td
              className={
                datos.response.ck < 12
                  ? "bg-danger bg-opacity-75"
                  : "bg-success bg-opacity-75"
              }
            >
              {datos.response.ck}
            </td>
          </tr>
          <tr>
            <td>Evaluacion uniforme</td>
            <td>Promedio mayor o igual a 8</td>
            <td
              className={
                datos.response.ev < 8
                  ? "bg-danger bg-opacity-75"
                  : "bg-success bg-opacity-75"
              }
            >
              {datos.response.ev}
            </td>
          </tr>
          <tr>
            <td>Orden y limpieza de la isla</td>
            <td>Promedio mayor o igual a 9</td>
            <td
              className={
                datos.response.oyl < 9
                  ? "bg-danger bg-opacity-75"
                  : "bg-success bg-opacity-75"
              }
            >
              {datos.response.oyl}
            </td>
          </tr>
          <tr>
            <td>Pasos para despachar</td>
            <td>Promedio mayor o igual a 8</td>
            <td
              className={
                datos.response.pd < 8
                  ? "bg-danger bg-opacity-75"
                  : "bg-success bg-opacity-75"
              }
            >
              {datos.response.pd}
            </td>
          </tr>
          <tr>
            <td>Recursos de despachador</td>
            <td>Promedio mayor o igual a 9</td>
            <td
              className={
                datos.response.rd < 9
                  ? "bg-danger bg-opacity-75"
                  : "bg-success bg-opacity-75"
              }
            >
              {datos.response.rd}
            </td>
          </tr>
          <tr>
            <td>SNC otras</td>
            <td>Menor o igual a 3</td>
            <td
              className={
                datos.response.sncOtras >= 3
                  ? "bg-danger bg-opacity-75"
                  : "bg-success bg-opacity-75"
              }
            >
              {datos.response.sncOtras}
            </td>
          </tr>
          <tr>
            <td>SNC por evaluación</td>
            <td>Menor o igual a 3</td>
            <td
              className={
                datos.response.sncEvaluacion >= 3
                  ? "bg-danger bg-opacity-75"
                  : "bg-success bg-opacity-75"
              }
            >
              {datos.response.sncEvaluacion}
            </td>
          </tr>
          <tr>
            <td>Total SNC</td>
            <td>---</td>
            <td>{datos.response.sncTotales}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DetalleBoletas;

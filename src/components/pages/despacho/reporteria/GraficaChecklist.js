import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputChangeYear from "../../../forms/InputChangeYear";
import InputChangeMes from "../../../forms/InputChangeMes";
import useGetData from "../../../../hooks/useGetData";
import Loader from "../../../assets/Loader";
import format from "../../../assets/format";
import Scale from "../../../charts/Scale";

function GraficaChecklist() {
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth() + 1);
  const checkBomba = useGetData(`/bomba-check/${year}/${month}`);

  const handleYear = (e) => {
    setYear(e.target.value);
  };

  const handleMonth = (e) => {
    setMonth(e.target.value);
  };
  let navigate = useNavigate();

  return (
    <div className="Main">
      <Link className="link-primary" to="/despacho">
        Volver al despacho
      </Link>
      <h3 className="border-bottom">Registro mensual de checklist</h3>
      <div className="row w-75 mx-auto">
        <div className="col-md-6">
          <InputChangeMes defaultMes={month} handle={handleMonth} />
        </div>
        <div className="col-md-6">
          <InputChangeYear defaultYear={year} handle={handleYear} />
        </div>
      </div>
      {!checkBomba.error && !checkBomba.isPending && (
        <Success data={checkBomba.data.response} year={year} month={month} />
      )}
      {checkBomba.isPending && <Loader />}
      <div className="d-flex justify-content-center">
        <span
          className="border rounded p-1 m-1"
          role="button"
          onClick={() => navigate("detalles")}
        >
          Mostrar detalles {">"}
        </span>
      </div>
    </div>
  );
}

const Success = ({ data, year, month }) => {
  const validarInserciones = (el) => {
    if (el.cumple) {
      return <span className="text-success m-0 p-0 fw-bold">1</span>;
    } else {
      if (!el.fecha_db) {
        return null;
      } else {
        return <span className="text-danger m-0 p-0 fw-bold">0</span>;
      }
    }
  };

  const totalChkB = useGetData(`/bomba-check/total/${year}/${month}`);
  let dataScale = {};

  if (!totalChkB.error && !totalChkB.isPending) {
    dataScale = {
      labels: totalChkB.data.response.map((el) => el.nombre_completo),
      datasets: [
        {
          label: "Empleados",
          data: totalChkB.data.response.map((el) => el.total_checklist),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "Minimo",
          data: totalChkB.data.response.map((el) => 28),
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    };
  }

  return (
    <div>
      <table className="table table-bordered w-100 m-auto mt-4" border="1px">
        <thead>
          <tr>
            <th rowSpan={2} align="center">
              Nombre del despachador
            </th>
            <th colSpan={data.length}>
              <span className="text-center">
                {format.formatTextoMayusPrimeraLetra(
                  format.formatMes(data[0].fecha)
                )}{" "}
                del {format.formatYear(data[0].fecha)}
              </span>
            </th>
          </tr>
          <tr>
            {data.map((el) => (
              <th key={format.obtenerDiaMes(el.fecha)}>
                {format.obtenerDiaMes(el.fecha)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data[0].data.map((el, i) => (
            <tr key={i}>
              <td>{el.nombre_completo}</td>
              {data.map((da, j) => (
                <td key={i + j}>{validarInserciones(da.data[i])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {!totalChkB.error && !totalChkB.isPending && (
        <div className="w-75 m-auto">{<Scale data={dataScale} />}</div>
      )}
    </div>
  );
};

export default GraficaChecklist;

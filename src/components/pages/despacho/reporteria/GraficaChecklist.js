import { useState } from "react";
import { Link } from "react-router-dom";
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
  console.log(checkBomba);

  const handleYear = (e) => {
    setYear(e.target.value);
  };

  const handleMonth = (e) => {
    setMonth(e.target.value);
  };
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
        <Success data={checkBomba.data.response} />
      )}
      {checkBomba.isPending && <Loader />}
    </div>
  );
}

const Success = ({ data }) => {
  const validarInserciones = (el) => {
    if (el.cumple) {
      return <span className="text-success m-0 p-0">1</span>;
    } else {
      if (!el.fecha_db) {
        return null;
      } else {
        return <span className="text-danger m-0 p-0">0</span>;
      }
    }
  };

  return (
    <div>
      <table className="table table-bordered w-75 m-auto mt-4" border="1px">
        <thead>
          <tr>
            <th>Nombre del despachador</th>
            {data.map((el) => (
              <th key={format.obtenerDiaMes(el.fecha)}>
                {format.obtenerDiaMes(el.fecha)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data[0].data.map((el, i) => (
            <tr>
              <td>{el.nombre_completo}</td>
              {data.map((da) => (
                <td>{validarInserciones(da.data[i])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Scale></Scale>
    </div>
  );
};

export default GraficaChecklist;

import { useState } from "react";
import HeaderComponents from "../../../../GUI/HeaderComponents";
import Scale from "../../../charts/Scale";
import { useNavigate, useParams } from "react-router-dom";
import InputChangeMes from "../../../forms/InputChangeMes";
import InputChangeYear from "../../../forms/InputChangeYear";
import useGetData from "../../../../hooks/useGetData";
import ErrorHttp from "../../../assets/ErrorHttp";
import format from "../../../assets/format";
import IconComponents from "../../../assets/IconComponents";
import PdfV2 from "../../../pdf_generador/PdfV2";

function GraficaOyLEmpleado() {
  const date = new Date();
  const timeSave = sessionStorage.getItem("tiempo");
  const dataTime = {
    year: timeSave ? JSON.parse(timeSave).year : date.getFullYear(),
    month: timeSave ? JSON.parse(timeSave).month : date.getMonth() + 1,
  };
  const [year, setYear] = useState(dataTime.year);
  const [month, setMonth] = useState(dataTime.month);
  const { idEmpleado } = useParams();

  const url = `/ordenLimpieza/${year}/${month}/${idEmpleado}`;
  const { data, error, isPending } = useGetData(url);

  const changeMes = (e) => {
    setMonth(e.target.value);
  };
  const changeYear = (e) => {
    setYear(e.target.value);
  };

  return (
    <div className="Main">
      <HeaderComponents
        urlBack="/despacho/orden-limpieza-isla/reporte"
        textUrlback="Regresar a reportes"
        title="Reportes de Orden y Limpieza de la Isla"
      >
        <IconComponents
          icon="calendar-days text-warning"
          text="MF tiempo"
          url="/despacho/montos-faltantes/historial"
        />
      </HeaderComponents>
      <div className="container">
        <form>
          <div className="row">
            <div className="mb-3 col-6">
              <label>Mes</label>
              <InputChangeMes defaultMes={month} handle={changeMes} />
            </div>
            <div className="mb-3 col 6">
              <label>Año</label>
              <InputChangeYear defaultYear={year} handle={changeYear} />
            </div>
          </div>
        </form>
        <div>
          {!isPending && !error && <Success data={data.response.empleado} />}
        </div>
      </div>
    </div>
  );
}

const Success = ({ data }) => {
  const { nombre, apellido_paterno, apellido_materno, evaluaciones } = data;
  const getQna = (fecha) => (new Date(fecha).getDate() < 15 ? "Qna1" : "Qna2");
  return (
    <div>
      <div>
        <h3>
          Reportes de{" "}
          {format.formatTextoMayusPrimeraLetra(
            `${nombre} ${apellido_paterno} ${apellido_materno}`
          )}
        </h3>
        <p>Evaluaciones capturadas en el mes: {evaluaciones.length}</p>
      </div>
      <div>
        {evaluaciones.length > 0 && (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th rowSpan={2}>Cumplimiento</th>
                {evaluaciones.map((el, i) => (
                  <th key={i} className="text-center">
                    {getQna(el[0].fecha)}
                  </th>
                ))}
              </tr>
              <tr>
                {evaluaciones.map((el, i) => (
                  <td key={i} className="text-center">
                    {format.formatFechaDB(el[0].fecha)}
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              {evaluaciones[0].map((el, i, arr) => (
                <tr key={i}>
                  <th>{el.cumplimiento}</th>
                  {evaluaciones.map((ev) => (
                    <th key={ev[i].idoyl}>{ev[i].cumple ? "1" : "0"}</th>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default GraficaOyLEmpleado;

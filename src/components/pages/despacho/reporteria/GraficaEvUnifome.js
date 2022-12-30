import { useState } from "react";
import { Link } from "react-router-dom";
import useGetData from "../../../../hooks/useGetData";
import InputChangeMes from "../../../forms/InputChangeMes";
import InputChangeYear from "../../../forms/InputChangeYear";
import InputSelectEmpleado from "../../../forms/InputSelectEmpleado";
import format from "../../../assets/format";
import Bar from "../../../charts/Bar";
import PdfGraficas from "../../../pdf_generador/PdfGraficas";
import Loader from "../../../assets/Loader";
import ErrorHttp from "../../../assets/ErrorHttp";

const GraficaEvUnifome = () => {
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth() + 1);
  const [iddespachador, setIddespachador] = useState(null);

  const despachador = useGetData(`/empleado?departamento=1`);
  const pasos = useGetData(`evaluacion-uniforme/get-pasos`);

  const handleYear = (e) => {
    setYear(e.target.value);
  };

  const handleMonth = (e) => {
    setMonth(e.target.value);
  };

  const changeDespachador = (e) => {
    setIddespachador(e.target.value);
  };

  return (
    <div className="Main">
      <Link className="link-primary" to="/despacho">
        Volver al despacho
      </Link>
      <h3 className="border-bottom">Evaluacion de uniformes a despachadores</h3>
      <div className="row w-75 mx-auto">
        <div className="col-md-6 mb-3">
          <label className="form-label">Selecciona el mes</label>
          <InputChangeMes defaultMes={month} handle={handleMonth} />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Selecciona el año</label>
          <InputChangeYear defaultYear={year} handle={handleYear} />
        </div>
        <div className="12">
          <label className="form-label">
            {despachador.isPending
              ? "Cargando despachadores"
              : "Escoje al despachador"}
          </label>
          {!despachador.isPending && !despachador.error && (
            <InputSelectEmpleado
              empleados={despachador.data.response}
              handle={changeDespachador}
              defaultValue={iddespachador}
            />
          )}
        </div>
      </div>
      {!pasos.error && !pasos.isPending && (
        <Success
          year={year}
          month={month}
          pasos={pasos.data.response}
          idempleado={iddespachador}
        />
      )}
      <div>
        <PdfGraficas />
      </div>
    </div>
  );
};

const Success = ({ pasos, year, month, idempleado }) => {
  const evUni = useGetData(
    `evaluacion-uniforme/periodo-mensual/${year}/${month}/${idempleado}`
  );
  let dataBar = {};

  if (!evUni.error && !evUni.isPending) {
    let evaluaciones = ["Primera Evaluacion", "Segunda Evaluacion"];
    dataBar = {
      labels: pasos.map((el) => el.cumplimiento.split(" ")),
      dataset: evUni.data.response.map((el, i) => ({
        data:
          evUni.data.response[i].evaluaciones.length > 0
            ? evUni.data.response[i].evaluaciones.map((ev) =>
                ev.cumple ? Number("1") : Number("0")
              )
            : [0, 0, 0, 0, 0, 0, 0],
        label: evaluaciones[i],
      })),
    };
    console.log(dataBar);
  }
  return (
    <div id="render" className="mt-5 m-auto">
      <table className="table container">
        <thead className="border">
          <tr>
            <th className="border text-center">Fecha</th>
            {!evUni.error &&
              !evUni.isPending &&
              evUni.data.response.map((el, i) => (
                <th key={i} className="py-1 text-center border">
                  {el.fecha ? (
                    format.formatFechaComplete(el.fecha)
                  ) : (
                    <span className="text-secondary">Sin asignar</span>
                  )}
                </th>
              ))}
          </tr>
          <tr>
            <th className="p-1 text-center border">Cumplimientos</th>
            <th className="p-1 text-center border">Primera evaluación</th>
            <th className="p-1 text-center border">Segunda evaluación</th>
          </tr>
        </thead>
        <tbody>
          {!evUni.error &&
            !evUni.isPending &&
            pasos.map((el, i) => (
              <tr key={el.idcumplimiento_uniforme} className="border">
                <td className="border">{el.cumplimiento}</td>
                {evUni.data.response[0].evaluaciones.length > 0 ? (
                  <td className="text-center border">
                    {evUni.data.response[0].evaluaciones[i].cumple ? "1" : "0"}
                  </td>
                ) : (
                  <td className="bg-secondary"></td>
                )}
                {evUni.data.response[1].evaluaciones.length > 0 ? (
                  <td className="text-center border">
                    {evUni.data.response[1].evaluaciones[i].cumple ? "1" : "0"}
                  </td>
                ) : (
                  <td className="bg-secondary"></td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
      {!evUni.error && !evUni.isPending && <Bar datos={dataBar} />}
    </div>
  );
};

export default GraficaEvUnifome;

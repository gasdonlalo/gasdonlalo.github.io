import { useState } from "react";
import HeaderComponents from "../../../GUI/HeaderComponents";
import useGetData from "../../../hooks/useGetData";
import Bar from "../../charts/Bar";
import Loader from "../../assets/Loader";
import InputChangeMes from "../../forms/InputChangeMes";
import InputChangeYear from "../../forms/InputChangeYear";
import format from "../../assets/format";
import PdfGraficas from "../../pdf_generador/PdfGraficas";

function ConcursoMadrugador() {
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth() + 1);
  const { data, error, isPending } = useGetData(
    `/madrugador/control-mensual/todos/${year}/${month}`
  );

  const changeMonth = (e) => setMonth(e.target.value);
  const changeYear = (e) => setYear(e.target.value);

  return (
    <div className="Main">
      <HeaderComponents
        urlBack="/recursos-humanos"
        textUrlback="Regresar a recursos humanos"
        title="Incentivo concurso el madrugador"
      />
      <div>
        <nav className="m-auto w-75 row">
          <div className="col-2">
            <label className="form-label">Mes</label>
            <InputChangeMes handle={changeMonth} defaultMes={month} />
          </div>
          <div className="col-2">
            <label className="form-label">Año</label>
            <InputChangeYear handle={changeYear} defaultYear={year} />
          </div>
        </nav>
      </div>
      {!error && !isPending && (
        <Success data={data.response} year={year} month={month} />
      )}
      {isPending && (
        <div className="mt-4">
          <Loader />
        </div>
      )}
    </div>
  );
}

const Success = ({ data, month, year }) => {
  const irregularidades = [];
  const dataBar = {
    labels: data.map((el) => el.empleado.nombre),
    dataset: [
      {
        label: "Puntaje final",
        backgroundColor: "rgba(5,112,14,1)",
        data: data.map((el) => el.puntosRestantes),
      },
    ],
  };

  let desFaltas = data.filter((el) => el.puntosPerdidos > 0);
  desFaltas.forEach((el) => {
    let data = el.fechas.filter(
      (inf) =>
        inf.puntos.check < 0 ||
        inf.puntos.entradaSalida < 0 ||
        inf.puntos.falta < 0 ||
        inf.puntos.retardo < 0
    );
    irregularidades.push({ fechas: data, ...el.empleado });
  });

  return (
    <div>
      <div id="render">
        <div className="mt-3 d-flex justify-content-evenly">
          <div style={{ flexGrow: 1 }}>
            <table className="m-auto w-100">
              <thead>
                <tr>
                  <th className="border px-2 text-center">
                    Nombre Completo Despachador
                  </th>
                  <th className="border px-2 text-center">Puntaje Final</th>
                </tr>
              </thead>
              <tbody>
                {data.map((el) => (
                  <tr key={el.empleado.idempleado}>
                    <td className="fw-semibold border px-2 text-nowrap">
                      {el.empleado.nombre_completo}
                    </td>
                    <td className="fw-semibold text-center border">
                      {el.puntosRestantes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ flexGrow: 3 }}>
            <Bar
              datos={dataBar}
              legend={false}
              y={[0, 250]}
              text="Puntaje final despachadores"
            />
          </div>
        </div>
      </div>
      <div className="my-4">
        <table className="m-auto">
          <thead>
            <tr>
              <th className="border px-2 text-center">Nombre completo</th>
              <th className="border px-2 text-center">Fecha</th>
              <th className="border px-2 text-center">Entrada / Salida</th>
              <th className="border px-2 text-center">Retardo</th>
              <th className="border px-2 text-center">Checklist</th>
              <th className="border px-2 text-center">Falta</th>
            </tr>
          </thead>
          <tbody>
            {irregularidades.length > 0 ? (
              irregularidades.map((el, i) =>
                el.fechas.map((fe, j) => (
                  <tr key={irregularidades.length * i + j}>
                    <td className="border px-2">{el.nombre_completo}</td>
                    <td className="border px-2">
                      {format.formatFechaComplete(fe.fecha)}
                    </td>
                    <td className="border text-center fw-semibold ">
                      {fe.puntos.entradaSalida}
                    </td>
                    <td className="border text-center fw-semibold">
                      {fe.puntos.retardo}
                    </td>
                    <td className="border text-center fw-semibold">
                      {fe.puntos.check}
                    </td>
                    <td className="border text-center fw-semibold">
                      {fe.puntos.falta}
                    </td>
                  </tr>
                ))
              )
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="text-center border fw-semibold text-success"
                >
                  Despachadores al corriente
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <PdfGraficas mes={month} year={year} anchografica="80%" />
    </div>
  );
};

export default ConcursoMadrugador;

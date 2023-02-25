import { Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import HeaderComponents from "../../../../GUI/HeaderComponents";
import useGetData from "../../../../hooks/useGetData";
import ErrorHttp from "../../../assets/ErrorHttp";
import format from "../../../assets/format";
import Loader from "../../../assets/Loader";
import Grafica from "../../../charts/Bar";
import InputChangeMes from "../../../forms/InputChangeMes";
import InputChangeYear from "../../../forms/InputChangeYear";

function EvalUniformeEmpleado() {
  let { id, year, month } = useParams();
  const [anio, setAnio] = useState(year);
  const [mes, setMes] = useState(month);

  const { data, error, isPending, dataError } = useGetData(
    `evaluacion-uniforme/${anio}/${mes}/${id}`
  );
  console.log(isPending, error, "si");
  console.log(data);
  const changeYear = (e) => {
    setAnio(e.target.value);
  };
  const changeMes = (e) => {
    setMes(e.target.value);
  };

  return (
    <div className="Main">
      <HeaderComponents
        title="Evaluaciones de uniforme por empleado"
        urlBack="../"
        textUrlback="Volver a tabla general"
      />
      {/* Select */}
      <div className="w-75 container-fluid">
        <div className="row">
          <div className="col-6">
            <label>Mes</label>
            <InputChangeMes defaultMes={month} handle={changeMes} />
          </div>
          <div className="col-6">
            <label>Año</label>
            <InputChangeYear defaultYear={year} handle={changeYear} />
          </div>
        </div>
      </div>
      {!isPending && !error && <Success datos={data.response} />}
      {isPending && <Loader />}
    </div>
  );
}
const Success = ({ datos }) => {
  const totalPuntos = datos[0].evaluaciones.map((el) => {
    return {
      total: el.filter((el) => el.cumple === true).length,
      fecha: format.formatFechaComplete(el[0].fecha),
    };
  });

  const dataBar = {
    labels: datos[0].cantidad.map((el) => el.cumplimiento),
    dataset: [
      {
        data: datos[0].cantidad.map((el) => el.totalBuena),
        label: "Total buenas",
      },
      {
        data: datos[0].cantidad.map((el) => el.totalMalas),
        label: "Total malas",
      },
    ],
  };
  const totalxEval = {
    labels: totalPuntos.map((el) => el.fecha),
    dataset: [{ data: totalPuntos.map((el) => el.total) }],
  };

  return (
    <div className="mt-3">
      {/*       <h4>
        Evaluaciones de uniforme de{" "}
        {format.formatTextoMayusPrimeraLetra(
          `${datos[0].nombre} ${datos[0].apellido_paterno} ${datos[0].apellido_materno}`
        )}
      </h4> */}
      {/* Tabla */}
      {datos[0].evaluaciones.length > 0 ? (
        <div>
          <div className="container-fluid">
            <table className="table table-bordered text-center">
              <thead>
                <tr>
                  <td colSpan={datos[0].cantidad.length + 2} className="fs-4">
                    Nombre del evaluado:{" "}
                    {format.formatTextoMayusPrimeraLetra(
                      `${datos[0].nombre} ${datos[0].apellido_paterno} ${datos[0].apellido_materno}`
                    )}
                  </td>
                </tr>
                <tr>
                  <th>Fecha</th>
                  {datos[0].cantidad.map((el) => {
                    return (
                      <Fragment>
                        <th>{el.cumplimiento}</th>
                      </Fragment>
                    );
                  })}
                  <th>Total de puntos por evaluación</th>
                </tr>
              </thead>
              <tbody>
                {datos[0].evaluaciones.map((el, i) => {
                  return (
                    <tr key={i}>
                      <td key={el[0].fecha}>
                        {format.formatFechaComplete(el[0].fecha)}
                      </td>
                      {el.map((el, i) => {
                        return (
                          <Fragment>
                            <td key={i}>{el.cumple ? "1" : "0"}</td>
                          </Fragment>
                        );
                      })}
                      <td>{totalPuntos[i].total}</td>
                    </tr>
                  );
                })}
                {/* <tr>
              <td colSpan={datos[0].cantidad.length + 2}>
                <table>
                  <thead>
                    <tr>
                      <th colSpan={datos[0].cantidad.length + 1}>Totales</th>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
              </td>
            </tr> */}
                <tr className="bg bg-success bg-opacity-50">
                  <th className="text-nowrap px-2">Total buenas</th>
                  {datos[0].cantidad.map((el) => {
                    return (
                      <Fragment>
                        <td>{el.totalBuena}</td>
                      </Fragment>
                    );
                  })}
                  <td className="bg-dark"></td>
                </tr>
                <tr className="bg bg-danger bg-opacity-50">
                  <th>Total malas</th>
                  {datos[0].cantidad.map((el) => {
                    return (
                      <Fragment>
                        <td>{el.totalMalas}</td>
                      </Fragment>
                    );
                  })}
                  <td className="bg-dark"></td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* Grafica */}
          <div className="d-flex">
            <div className="m-auto w-50">
              <Grafica
                datos={dataBar}
                text="Total puntos buenos y malos"
                optionsCustom={{
                  scales: {
                    y: {
                      title: { display: true, text: "Puntaje" },
                    },
                    x: { title: { display: true, text: "Rubros evaluados" } },
                  },
                }}
              />
            </div>
            <div className="m-auto w-50">
              <Grafica
                datos={totalxEval}
                text="Total de puntos por evaluaciones"
                legend={false}
                optionsCustom={{
                  scales: {
                    y: { title: { display: true, text: "Puntos totales" } },
                    x: { title: { display: true, text: "Fecha" } },
                  },
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <ErrorHttp />
        </div>
      )}
    </div>
  );
};

export default EvalUniformeEmpleado;

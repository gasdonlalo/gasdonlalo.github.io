import { Fragment, useState } from "react";
import useGetData from "../../../../hooks/useGetData";
import InputChangeMes from "../../../forms/InputChangeMes";
import InputChangeYear from "../../../forms/InputChangeYear";
import InputSelectEmpleado from "../../../forms/InputSelectEmpleado";
import format from "../../../assets/format";
import Bar from "../../../charts/Bar";
import PdfV2 from "../../../pdf_generador/PdfV2";
import HeaderComponents from "../../../../GUI/HeaderComponents";
import IconComponents from "../../../assets/IconComponents";
import Decimal from "decimal.js-light";
import { Link } from "react-router-dom";
import Scale from "../../../charts/Scale";

const GraficaEvUnifome = () => {
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth() + 1);
  //const [iddespachador, setIddespachador] = useState(null);

  //const despachador = useGetData(`/empleado?departamento=1`);
  const pasos = useGetData(`evaluacion-uniforme/get-pasos`);
  const { data, isPending, dataError, error } = useGetData(
    `evaluacion-uniforme/${year}/${month}`
  );

  const handleYear = (e) => {
    setYear(e.target.value);
  };

  const handleMonth = (e) => {
    setMonth(e.target.value);
  };

  /* const changeDespachador = (e) => {
    setIddespachador(e.target.value);
  }; */

  return (
    <div className="Main">
      <HeaderComponents
        title="Evaluación de uniforme"
        urlBack="/despacho"
        textUrlback="Volver a despacho"
      >
        <div className="d-flex">
          <IconComponents
            icon="shirt text-info"
            url="../evaluacion-uniforme"
            text="Evaluar"
          />
          <IconComponents
            icon="file-lines text-warning"
            url="../evaluacion-uniforme/historial"
            text="Registros"
          />
        </div>
      </HeaderComponents>
      <div className="container-fluid w-75 mt-3">
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Selecciona el mes</label>
            <InputChangeMes defaultMes={month} handle={handleMonth} />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Selecciona el año</label>
            <InputChangeYear defaultYear={year} handle={handleYear} />
          </div>
          {/* <div className="12">
          <label className="form-label">
            {despachador.isPending
              ? "Cargando despachadores"
              : "Escoje al despachador"}
          </label>
          {!despachador.isPending && !despachador.error && (
            <InputSelectEmpleado
              empleados={despachador.data.response}
              handle={changeDespachador}
              defaultData={{
                id: iddespachador,
                nombre: "Empledo seleccionado",
              }}
            />
          )}
        </div> */}
        </div>
      </div>

      {!isPending && !error && (
        <TablaGral datos={data.response} year={year} month={month} />
      )}
      {/* {!pasos.error && !pasos.isPending && (
        <Success
          year={year}
          month={month}
          pasos={pasos.data.response}
          idempleado={iddespachador}
          iddespachador={iddespachador}
        />
      )} */}
    </div>
  );
};

/* const Success = ({ pasos, year, month, idempleado, iddespachador }) => {
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
  }

  return (
    <Fragment>
      <div className="mt-5 m-auto">
        <table id="tabla" className="table container">
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
                      {evUni.data.response[0].evaluaciones[i].cumple
                        ? "1"
                        : "0"}
                    </td>
                  ) : (
                    <td className="bg-secondary"></td>
                  )}
                  {evUni.data.response[1].evaluaciones.length > 0 ? (
                    <td className="text-center border">
                      {evUni.data.response[1].evaluaciones[i].cumple
                        ? "1"
                        : "0"}
                    </td>
                  ) : (
                    <td className="bg-secondary"></td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
        {!evUni.error && !evUni.isPending && (
          <div id="render">
            <Bar
              datos={dataBar}
              text="Evaluación uniforme"
              optionsCustom={{
                scales: {
                  y: {
                    title: {
                      display: true,
                      text: "Puntos",
                      font: {
                        size: "20px",
                        weight: "bold",
                      },
                    },
                    min: 0,
                    max: 1,
                    ticks: {
                      stepSize: 1,
                    },
                  },
                },
              }}
            />
          </div>
        )}
      </div>
      <div>
        <PdfV2
          month={month}
          year={year}
          tabla="tabla"
          idempleado={iddespachador}
        />
      </div>
    </Fragment>
  );
}; */
const TablaGral = ({ datos, year, month }) => {
  const [evaluaciones, setEvaluaciones] = useState(datos);

  const filterEmp = (e) => {
    const exp = new RegExp(`${e.target.value}`, "gi");
    const search = datos.filter((el) => {
      const { nombre, apellido_paterno, apellido_materno } = el;
      return exp.test(`${nombre} ${apellido_paterno} ${apellido_materno}`);
    });
    setEvaluaciones(search);
  };

  const dataBar = {
    labels: evaluaciones.map((el) =>
      format.formatTextoMayusPrimeraLetra(
        `${el.nombre} ${el.apellido_paterno} ${el.apellido_materno} `
      )
    ),
    datasets: [
      {
        data: evaluaciones.map((el) => new Decimal(el.promedio).toFixed(2)),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        label: "Puntos",
      },
    ],
  };

  return (
    <div className="container-fluid w-75">
      {/* Buscador */}
      <div className="mb-3">
        <div className="row">
          <div className="offset-md-6 col-md-6">
            <div className="d-flex gap-2">
              <input
                type="text"
                className="form-control"
                name="buscador"
                id="buscador"
                onChange={filterEmp}
                placeholder="Buscar un empleado..."
              />
            </div>
          </div>
        </div>
      </div>
      {/* Tabla */}
      <div style={{ maxHeight: "50vh", overflowY: "scroll" }}>
        <table className="table table-bordered text-center">
          <thead>
            <tr>
              <th>Empleado</th>
              <th className="w-25">
                Promedio de mensual de evaluación de uniforme
              </th>
            </tr>
          </thead>
          <tbody>
            {evaluaciones.map((el) => {
              return (
                <tr>
                  <td>
                    <Link
                      to={`${el.idempleado}/${year}/${month}`}
                    >{`${el.nombre} ${el.apellido_paterno} ${el.apellido_materno} `}</Link>
                  </td>
                  <td>{new Decimal(el.promedio).toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="m-auto">
        <Scale data={dataBar} text="Promedios de evaluacion uniforme" />
      </div>
    </div>
  );
};

export default GraficaEvUnifome;

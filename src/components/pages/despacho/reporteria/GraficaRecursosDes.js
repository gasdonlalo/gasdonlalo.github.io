import { Fragment, useState } from "react";
import useGetData from "../../../../hooks/useGetData";
import InputChangeYear from "../../../forms/InputChangeYear";
import InputChangeMes from "../../../forms/InputChangeMes";
import Loader from "../../../assets/Loader";
import ErrorHttp from "../../../assets/ErrorHttp";
import Scale from "../../../charts/Scale";
import PdfV2 from "../../../pdf_generador/PdfV2";
import HeaderComponents from "../../../../GUI/HeaderComponents";
import IconComponents from "../../../assets/IconComponents";

const GraficaRecursosDes = () => {
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth() + 1);
  const [quincena, setQuincena] = useState(1);
  //const despachador = useGetData("/empleado?departamento=1");
  const recursos = useGetData(
    `/lista-recurso-despachador/empleados/${year}/${month}/${quincena}`
  );
  console.log(recursos);
  const changeYear = (e) => setYear(e.target.value);
  const changeMonth = (e) => setMonth(e.target.value);
  const handleQuincena = (e) => setQuincena(e.target.value);
  return (
    <div className="Main">
      <HeaderComponents
        urlBack="/despacho"
        textUrlback="Volver al despacho"
        title="Reporte de recursos de despachador"
      >
        <div className="d-flex">
          <IconComponents
            icon="stapler text-info"
            text="Evaluar"
            url="/despacho/recurso-despachador"
          />
          <IconComponents
            icon="file-lines text-warning"
            text="Historial"
            url="/despacho/recurso-despachador/historial"
          />
        </div>
      </HeaderComponents>
      <div className="w-50 m-auto row">
        <div className="col-md-4">
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
        <div className="col-md-4">
          <label className="form-label">Selecciona el mes</label>
          <InputChangeMes handle={changeMonth} defaultMes={month} />
        </div>
        <div className="col-md-4">
          <label className="form-label">Selecciona el año</label>
          <InputChangeYear handle={changeYear} defaultYear={year} />
        </div>
      </div>
      {!recursos.error && !recursos.isPending && (
        <Success
          recursos={recursos.data.response}
          year={year}
          month={month}
          quincena={quincena}
        />
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

const Success = ({ recursos, year, month, quincena }) => {
  const table = recursos.filter((re) => re.recursos.length > 0);

  const tableTotalPuntos = recursos.map((el) => {
    if (el.recursos.length < 0) {
      return {
        idempleado: el.idempleado,
        nombre_completo: el.nombre_completo,
        puntaje_minimo: el.puntaje_minimo,
        cantidad: 0,
      };
    }

    let sumaPuntos = el.recursos
      .map((re) => (re.evaluacion ? 1 : 0))
      .reduce((a, b) => a + b, 0);

    return {
      idempleado: el.idempleado,
      nombre_completo: el.nombre_completo,
      cantidad: sumaPuntos,
      puntaje_minimo: el.puntaje_minimo,
    };
  });

  let dataScale = {
    labels: tableTotalPuntos.map((el) => el.nombre_completo),
    datasets: [
      {
        data: tableTotalPuntos.map((el) => el.cantidad),
        backgroundColor: "rgba(6,43,223,1)",
        borderColor: "rgba(6,43,223,1)",
        label: "Total",
      },
      {
        data: tableTotalPuntos.map((el) => el.puntaje_minimo),
        backgroundColor: "rgba(253,124,13,1)",
        borderColor: "rgba(253,124,13,1)",
        label: "Puntaje minimo",
      },
    ],
  };
  console.log(dataScale);

  return (
    <Fragment>
      <div className="mt-5">
        {table.length > 0 ? (
          <div style={{ overflowX: "scroll" }}>
            <table className="text-center" id="tabla">
              <thead>
                <tr>
                  <th className="border">
                    <div style={{ width: "350px" }}>Empleado</div>
                  </th>
                  {table[0].recursos.map((el) => (
                    <th key={el.idrecurso_despachador} className="border">
                      <div style={{ width: "85px", fontSize: "10pt" }}>
                        {el.recurso}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.map((el, i) => (
                  <tr key={i}>
                    <td className="text-start border">{el.nombre_completo}</td>
                    {table[i].recursos.map((re) => (
                      <td
                        key={re.idrecurso_despachador}
                        className="fw-bold border"
                      >
                        {re.evaluacion ? (
                          <span className="text-success">1</span>
                        ) : (
                          <span className="text-danger">0</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>
            <ErrorHttp />
          </div>
        )}

        {table.length > 0 && (
          <div className="mt-4 d-flex justify-content-between" id="render">
            <div>
              <table>
                <thead>
                  <tr>
                    <th className="border">
                      <div>Nombre completo</div>
                    </th>
                    <th className="border">
                      <div>Puntos obtenidos</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tableTotalPuntos.map((el) => (
                    <tr key={el.idempleado}>
                      <td className="border">{el.nombre_completo}</td>
                      <td className="text-center fw-semibold border">
                        {el.cantidad}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ flexGrow: "1" }}>
              <Scale
                data={dataScale}
                optionsCustom={{
                  scales: {
                    y: {
                      min: 0,
                      max: 20,
                      ticks: {
                        stepSize: 1,
                      },
                    },
                  },
                }}
              ></Scale>
            </div>
          </div>
        )}
      </div>
      {table.length > 0 && (
        <div className="mt-3">
          <PdfV2 tabla="tabla" year={year} month={month} quincena={quincena} />
        </div>
      )}
    </Fragment>
  );
};
export default GraficaRecursosDes;

import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputChangeYear from "../../../forms/InputChangeYear";
import InputChangeMes from "../../../forms/InputChangeMes";
import useGetData from "../../../../hooks/useGetData";
import Loader from "../../../assets/Loader";
import format from "../../../assets/format";
import Scale from "../../../charts/Scale";
import PdfV2 from "../../../pdf_generador/PdfV2";
import HeaderComponents from "../../../../GUI/HeaderComponents";
import IconComponents from "../../../assets/IconComponents";

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
  let navigate = useNavigate();

  return (
    <div className="Main">
      <HeaderComponents
        urlBack="/despacho"
        textUrlback="Volver al Despacho"
        title="Registro Mensual de Checklist"
      >
        <IconComponents
          icon="check text-primary"
          text="Checklist"
          url="/despacho/checklist"
        />
      </HeaderComponents>

      <div className="row w-75 mx-auto">
        <div className="col-md-6">
          <InputChangeMes defaultMes={month} handle={handleMonth} />
        </div>
        <div className="col-md-6">
          <InputChangeYear defaultYear={year} handle={handleYear} />
        </div>
      </div>
      {!checkBomba.error && !checkBomba.isPending && (
        <Success
          data={checkBomba.data.response}
          year={year}
          month={month}
          navigate={navigate}
        />
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
  const iterar = data.map((el) => {
    const filtrado = el.fechas;
    //console.log(filtrado);
    const total = filtrado
      .map((seg) => (seg.snc ? 1 : 0))
      .reduce((a, b) => a + b, 0);
    return { empleado: el.empleado, total };
  });

  const dataScale = {
    labels: iterar.map((el) => el.empleado.nombre),
    datasets: [
      {
        label: "empleados",
        data: iterar.map((el) => el.total),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "puntaje minimo",
        data: iterar.map((el) => 28),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  console.log(dataScale);
  /* const validarInserciones = (el, da) => {
    if (el.cumple) {
      return (
        <span
          className="text-success m-0 p-0 fw-bold"
          onClick={() =>
            navigate(`/despacho/checklist/${da.idempleado}/${da.fechaGenerada}`)
          }
          role="button"
        >
          1
        </span>
      );
    } else {
      if (!el.fecha_db) {
        return null;
      } else {
        return (
          <span
            className="text-danger m-0 p-0 fw-bold"
            onClick={() =>
              navigate(
                `/despacho/checklist/${da.idempleado}/${da.fechaGenerada}`
              )
            }
            role="button"
          >
            0
          </span>
        );
      }
    }
  }; */

  /* const totalChkB = useGetData(`/bomba-check/total/${year}/${month}`);
  let dataScale = {}; */

  /* if (!totalChkB.error && !totalChkB.isPending) {
    dataScale = {
      labels: data.response.map((el) => el.empleado.nombre_completo),
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
  } */

  return (
    <Fragment>
      <div>
        <table
          id="tabla"
          className="table table-bordered w-100 m-auto mt-4"
          border="1px"
        >
          <thead>
            <tr>
              <th rowSpan={2} align="center">
                Nombre del despachador
              </th>
              <th colSpan={data.length}>
                <span className="text-center">
                  {format.formatTextoMayusPrimeraLetra(
                    format.formatMes(data[0].fechas[0].fecha)
                  )}{" "}
                  del {format.formatYear(data[0].fechas[0].fecha)}
                </span>
              </th>
            </tr>
            <tr>
              {data[0].fechas.map((el) => (
                <th key={format.obtenerDiaMes(el.fecha)}>
                  {format.obtenerDiaMes(el.fecha)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((el, i) => (
              <tr key={i}>
                <td className="fw-semibold">
                  {el.empleado.nombre} {el.empleado.apellido_paterno}
                  {el.empleado.apellido_materno}
                </td>
                {el.fechas.map((fe, j) => (
                  <td key={j}>{fe.snc === null ? null : fe.snc ? 1 : 0}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div id="render" className="w-75 m-auto">
          {<Scale data={dataScale} />}
        </div>
      </div>
      <div>
        <PdfV2 month={month} year={year} tabla="tabla" />
      </div>
    </Fragment>
  );
};

export default GraficaChecklist;

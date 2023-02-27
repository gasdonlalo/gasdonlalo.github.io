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
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Datos } from "../../../Provider/Checklist";
import { useContext } from "react";

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

      <div className="row w-75 mx-auto mt-3">
        <div className="col-md-6">
          <InputChangeMes defaultMes={month} handle={handleMonth} />
        </div>
        <div className="col-md-6">
          <InputChangeYear defaultYear={year} handle={handleYear} />
        </div>
      </div>
      {!checkBomba.error && !checkBomba.isPending && (
        <Success
          datos={checkBomba.data.response}
          year={year}
          month={month}
          navigate={navigate}
        />
      )}
      {checkBomba.isPending && <Loader />}
    </div>
  );
}

const Success = ({ datos, year, month }) => {
  const setData = useContext(Datos);
  const navigate = useNavigate();
  const totalBuenas = datos.map((el) => {
    return {
      empleado: `${el.empleado.nombre} ${el.empleado.apellido_paterno} ${el.empleado.apellido_materno}`,
      id: el.empleado.idempleado,
      total: el.fechas
        .map((el) => el.cumple)
        .filter((el) => el === 1)
        .reduce((a, b) => a + b, 0),
    };
  });

  const totalMalas = datos.map((el) => {
    return {
      empleado: `${el.empleado.nombre} ${el.empleado.apellido_paterno} ${el.empleado.apellido_materno}`,
      total: el.fechas.map((el) => el.cumple).filter((el) => el === 0).length,
    };
  });

  const dataBar = {
    labels: totalBuenas.map((el) => el.empleado),
    datasets: [
      {
        data: totalBuenas.map((el) => el.total),
        borderColor: "rgb(0,200,37)",
        backgroundColor: "rgba(0,200,37, 0.5)",
        label: "Correctos",
      },
      {
        data: totalMalas.map((el) => el.total),
        borderColor: "rgb(200,0,0)",
        backgroundColor: "rgba(200,0,0, 0.5)",
        label: "Incorrectos",
      },
    ],
  };
  return (
    <div>
      {/* tabla */}
      <div className="container-fluid mt-3 " style={{ overflowX: "scroll" }}>
        <table className="table table-bordered text-center" id="tabla">
          <thead>
            <tr>
              <th>Nombre del empleado</th>
              {datos[0].fechas.map((el) => {
                return (
                  <Fragment>
                    <th>{el.fecha}</th>
                  </Fragment>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {datos.map((el) => {
              return (
                <tr>
                  <td className="text-nowrap px-2">
                    <OverlayTrigger
                      key="right"
                      placement="right"
                      overlay={
                        <Tooltip id="tooltip-right">
                          Haz clic para ver mas detalles
                        </Tooltip>
                      }
                    >
                      <span
                        className="link-primary text-decoration-underline"
                        onClick={() => (
                          // eslint-disable-next-line
                          setData[1]([datos]),
                          navigate(
                            `../checklist/${year}/${month}/${el.empleado.idempleado}`
                          )
                        )}
                      >
                        {format.formatTextoMayusPrimeraLetra(
                          `${el.empleado.nombre} ${el.empleado.apellido_paterno} ${el.empleado.apellido_materno}`
                        )}
                      </span>
                    </OverlayTrigger>
                  </td>
                  {el.fechas.map((el) => {
                    return (
                      <Fragment>
                        <td
                          className={
                            el.cumple === 1
                              ? "bg-success bg-opacity-50"
                              : el.cumple === 0
                              ? "bg-danger bg-opacity-50"
                              : null
                          }
                        >
                          {el.cumple}
                        </td>
                      </Fragment>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Grafica */}
      <div className="m-auto " id="render">
        <Scale
          data={dataBar}
          text="Checklist correctos e incorrectos realizados mensuales por empleado"
          optionsCustom={{
            scales: {
              y: {
                min: 0,
                ticks: { stepSize: 1 },
                title: {
                  display: true,
                  text: "Numero de checklist realizados",
                },
              },
              x: {
                title: {
                  display: true,
                  text: "Empleados",
                },
              },
            },
          }}
        />
      </div>
      <PdfV2 tabla="tabla" month={month} year={year} />
    </div>
  );
};

export default GraficaChecklist;

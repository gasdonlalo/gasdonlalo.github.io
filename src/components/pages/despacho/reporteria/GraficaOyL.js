import { useState } from "react";
import HeaderComponents from "../../../../GUI/HeaderComponents";
import Scale from "../../../charts/Scale";
import { useNavigate } from "react-router-dom";
import InputChangeMes from "../../../forms/InputChangeMes";
import InputChangeYear from "../../../forms/InputChangeYear";
import useGetData from "../../../../hooks/useGetData";
import ErrorHttp from "../../../assets/ErrorHttp";
import format from "../../../assets/format";
import IconComponents from "../../../assets/IconComponents";
import PdfV2 from "../../../pdf_generador/PdfV2";

function GraficaOyL() {
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth() + 1);

  const url = `/ordenLimpieza/${year}/${month}`;
  const oyL = useGetData(url);

  const changeMes = (e) => {
    setMonth(e.target.value);
  };
  const changeYear = (e) => {
    setYear(e.target.value);
  };

  return (
    <div className="Main">
      <HeaderComponents
        urlBack="/despacho"
        textUrlback="Regresar a despacho"
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
          {!oyL.isPending && !oyL.error && (
            <Success data={oyL.data.response} year={year} month={month} />
          )}
        </div>
      </div>
    </div>
  );
}

const Success = ({ data, year, month }) => {
  const navigate = useNavigate();
  const navOyL = (el) => {
    sessionStorage.setItem("tiempo", JSON.stringify({ year, month }));
    navigate(`${el.idempleado}`);
  };
  const dataBar = {
    labels: data.map(
      (el) =>
        `${
          el.nombre
        } ${el.apellido_paterno.charAt()}. ${el.apellido_materno.charAt()}.`
    ),
    datasets: [
      {
        data: data.map((el) => el.totalPuntos),
        backgroundColor: "rgba(117, 226, 25, 1)",
        borderColor: "rgba(117, 226, 25, 1)",
        label: "Puntos",
        pointRadius: 6,
      },
      {
        data: data.map(() => 18),
        backgroundColor: "rgba(226, 105, 25, 1)",
        borderColor: "rgba(226, 105, 25, 1)",
        label: "Puntos Minimos",
        pointRadius: 0,
      },
    ],
  };
  return (
    <div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Nombre despachador</th>
            <th className="text-center">
              Puntos acumulado en las evaluaciones
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((el, i) => (
            <tr key={i}>
              <td onClick={() => navOyL(el)}>
                {el.nombre} {el.apellido_paterno} {el.apellido_materno}
              </td>
              <td className="text-center">{el.totalPuntos}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <Scale
          text="Puntos de Orden y Limpieza"
          data={dataBar}
          optionsCustom={{
            scales: {
              y: {
                title: {
                  display: true,
                  text: "Puntos acumulados",
                  font: {
                    size: 20,
                    bold: "medium",
                  },
                },
              },
              x: {
                title: {
                  display: true,
                  text: "Despachadores",
                  font: {
                    size: 20,
                    bold: "medium",
                  },
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default GraficaOyL;

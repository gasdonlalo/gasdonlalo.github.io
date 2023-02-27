import HeaderComponents from "../../../GUI/HeaderComponents";
import { Fragment, useState } from "react";
import InputChangeMes from "../../forms/InputChangeMes";
import InputChangeYear from "../../forms/InputChangeYear";
import useGetData from "../../../hooks/useGetData";
import Bar from "../../charts/Bar";
import PdfV2 from "../../pdf_generador/PdfV2";
import Loader from "../../assets/Loader";

function PorEmpleadoTipo() {
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth() + 1);

  const { data, error, isPending } = useGetData(
    `/salida-no-conforme/${year}/${month}/incumplimientoxiddepartamento/1`
  );

  const handleMonth = (e) => {
    setMonth(e.target.value);
  };

  const handleYear = (e) => {
    setYear(e.target.value);
  };

  return (
    <div className="Main">
      <HeaderComponents
        title="Salida no conforme por empleado y tipo"
        textUrlback="Volver a reportes de SNC"
        urlBack="../files"
      />
      <div className="row w-75 mx-auto mt-4">
        <div className="col-md-6">
          <InputChangeMes defaultMes={month} handle={handleMonth} />
        </div>
        <div className="col-md-6">
          <InputChangeYear defaultYear={year} handle={handleYear} />
        </div>
      </div>
      {!error && !isPending && (
        <Success datos={data.response} month={month} year={year} />
      )}
      {isPending && <Loader />}
    </div>
  );
}
const Success = ({ datos, month, year }) => {
  const sumaSNCTipo = () => {
    const agrupar = datos[0].incumplimientos.map((el, i) => {
      //total: datos.incumplimientos.map((el) => el.total),
      //incumplimiento: el.incumplimiento,
      return datos.map((el) => el.incumplimientos[i].total);
    });
    const suma = agrupar.map((el, i) => {
      return el.map((el) => el).reduce((a, b) => a + b);
    });
    return suma;
  };

  const totalSNC = datos.map((el) => el.totalSNC).reduce((a, b) => a + b, 0);

  const dataBarTipo = {
    labels: datos[0].incumplimientos.map((el) => [el.incumplimiento]),
    dataset: [{ data: sumaSNCTipo(), label: "SNC" }],
  };

  const dataBarEmpleado = {
    labels: datos.map((el) => [el.empleado]),
    dataset: [
      {
        data: datos.map((el) => el.totalSNC),
        label: "SNC",
        backgroundColor: "rgba(237,50,5,1)",
      },
    ],
  };
  console.log(dataBarEmpleado);
  return (
    <div className="container-fluid">
      <div className="mt-3" style={{ overflowX: "scroll" }}>
        <table className="table table-bordered text-center  " id="tabla">
          <thead>
            <tr>
              <th>Despachador</th>
              {datos[0].incumplimientos.map((e) => {
                return (
                  <Fragment>
                    <th key={e.incumplimiento}>{e.incumplimiento}</th>
                  </Fragment>
                );
              })}
              <th>Total despachador</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((el, i) => {
              return (
                <tr key={i}>
                  <td key={el.empleado} className="text-nowrap">
                    {el.empleado}
                  </td>
                  {el.incumplimientos.map((el, i) => {
                    return (
                      <Fragment>
                        <td key={i} style={{ width: "50px" }}>
                          {el.total}
                        </td>
                      </Fragment>
                    );
                  })}
                  <td>{el.totalSNC}</td>
                </tr>
              );
            })}
            <tr>
              <td className="bg-warning bg-opacity-50">Total por tipo SNC</td>
              {sumaSNCTipo().map((el, i) => {
                return (
                  <td key={i} className="bg-secondary bg-opacity-50">
                    {el}
                  </td>
                );
              })}
              <td className="bg-danger">{totalSNC}</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Graficas */}
      <div className="d-flex " id="render">
        <div className="m-auto w-50">
          <Bar
            datos={dataBarTipo}
            text="Salidas no conformes por tipo"
            legend={false}
            optionsCustom={{
              scales: {
                y: {
                  title: {
                    display: true,
                    text: "Numero de SNC",
                  },
                },
                x: {
                  title: {
                    display: true,
                    text: "Tipo de SNC",
                  },
                },
              },
            }}
          />
        </div>
        <div className="m-auto w-50">
          <Bar
            datos={dataBarEmpleado}
            text="Salidas no conformes por empleado"
            legend={false}
            optionsCustom={{
              scales: {
                y: {
                  title: {
                    display: true,
                    text: "Numero de SNC",
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
      </div>
      <PdfV2 tabla="tabla" month={month} year={year} />
    </div>
  );
};

export default PorEmpleadoTipo;

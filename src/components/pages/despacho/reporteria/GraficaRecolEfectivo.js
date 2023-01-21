import { Fragment, useState } from "react";
import HeaderComponents from "../../../../GUI/HeaderComponents";
import IconComponents from "../../../assets/IconComponents";
import useGetData from "../../../../hooks/useGetData";
import InputChangeMes from "../../../forms/InputChangeMes";
import InputChangeYear from "../../../forms/InputChangeYear";
import format from "../../../assets/format";
import Bar from "../../../charts/Bar";
import Loader from "../../../assets/Loader";
import ErrorHttp from "../../../assets/ErrorHttp";
import PdfV2 from "../../../pdf_generador/PdfV2";

const GraficaRecolEfectivo = () => {
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth() + 1);
  const recolecciones = useGetData(
    `/recoleccion-efectivo/general/${year}/${month}`
  );
  const changeYear = (e) => setYear(e.target.value);
  const changeMonth = (e) => setMonth(e.target.value);
  return (
    <div className="Main">
      <HeaderComponents
        title="Recolección de efectivo"
        urlBack="/despacho"
        textUrlback="Regresar a despacho"
      >
        <div className="d-flex">
          <IconComponents
            icon="sack-dollar text-info"
            url="/despacho/recoleccion-efectivo"
            text="Registros"
          />
          <IconComponents
            icon="file-lines text-warning"
            url="/despacho/recoleccion-efectivo/historial"
            text="Ver Recolecciones"
          />
        </div>
      </HeaderComponents>

      <div className="d-flex justify-content-around m-auto w-50">
        <div className="">
          <label className="form-label">Selecciona el mes</label>
          <InputChangeMes handle={changeMonth} defaultMes={month} />
        </div>
        <div className="">
          <label className="form-label">Selecciona el año</label>
          <InputChangeYear handle={changeYear} defaultYear={year} />
        </div>
      </div>
      {!recolecciones.error && !recolecciones.isPending && (
        <Success data={recolecciones.data.response} />
      )}
      {recolecciones.error && !recolecciones.isPending && (
        <div className="mt-5">
          <ErrorHttp
            code={recolecciones.dataError.code}
            msg={recolecciones.dataError.msg}
          />
        </div>
      )}
      {recolecciones.isPending && <Loader />}
    </div>
  );
};

const Success = ({ data }) => {
  console.log(data);
  return (
    <Fragment>
      <div>
        <div style={{ overflowX: "scroll" }}>
          <table className="table table-bordered mt-4" id="tabla">
            <thead>
              <tr>
                <th style={{ minWidth: "350px" }}>Nombre del despachador</th>
                {data[0].dataFecha.map((el, i) => (
                  <th key={i}>
                    {format.formatFechaComplete(el.fechaGenerada)}
                  </th>
                ))}
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {data.map((el, i) => (
                <tr key={el.empleado.idempleado}>
                  <td>{el.empleado.nombre_completo}</td>
                  {data[i].dataFecha.map((f, j) => (
                    <td key={el.dataFecha.length * i + j + 1}>
                      <span>{format.formatDinero(f.total_cantidad)}</span>
                    </td>
                  ))}
                  <td>
                    {format.formatDinero(data[i].empleado.total_cantidad_mes)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <TableTotal data={data} />
        </div>
        <div>
          <PdfV2 tabla="tabla" />
        </div>
      </div>
    </Fragment>
  );
};

const TableTotal = ({ data }) => {
  let dataBar = {
    labels: data.map((el) => el.empleado.nombre_completo.split(" ")),
    dataset: [
      {
        data: data.map(
          (el) => el.dataFecha.filter((el) => el.total_cantidad).length
        ),
        label: "Total de recolecciones",
      },
    ],
  };
  return (
    <div className="w-100">
      <div>
        <table
          className="table table-bordered m-auto"
          style={{ width: "600px" }}
          id="tabla"
        >
          <thead>
            <tr>
              <th className=" text-center">
                <div style={{ width: "300px" }}>Nombre del despachador</div>
              </th>
              <th className=" text-center">
                <div style={{ width: "230px" }}>
                  Total de salidas no conformes
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((el) => (
              <tr key={el.empleado.idempleado}>
                <td className="p-0 ps-1">{el.empleado.nombre_completo}</td>
                <td className=" text-center p-0">
                  {el.dataFecha.filter((el) => el.total_cantidad).length}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-75 m-auto" id="render">
        <Bar
          datos={dataBar}
          text="Recolecciones de efectivo al mes"
          legend={false}
        />
      </div>
    </div>
  );
};
export default GraficaRecolEfectivo;

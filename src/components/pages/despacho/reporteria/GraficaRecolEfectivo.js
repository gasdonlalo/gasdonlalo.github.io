import { useState } from "react";
import { Link } from "react-router-dom";
import useGetData from "../../../../hooks/useGetData";
import format from "../../../assets/format";

const GraficaRecolEfectivo = () => {
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth() + 1);
  const recolecciones = useGetData(
    `/recoleccion-efectivo/general/${year}/${month}`
  );
  console.log(recolecciones);
  return (
    <div className="Main">
      <Link className="link-primary" to="/despacho">
        Volver al despacho
      </Link>
      <div>
        <h3 className="border-bottom">Recoleccion de efectivo</h3>
      </div>
      {!recolecciones.error && !recolecciones.isPending && (
        <Success data={recolecciones.data.response} />
      )}
    </div>
  );
};

const Success = ({ data }) => {
  return (
    <div>
      <div style={{ overflowX: "scroll" }}>
        <table className="table table-bordered mt-4">
          <thead>
            <tr>
              <th>
                <div style={{ minWidth: "350px" }}> Nombre del despachador</div>
              </th>
              {data[0].dataFecha.map((el, i) => (
                <th key={i}>{format.formatFechaComplete(el.fechaGenerada)}</th>
              ))}
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {data.map((el, i) => (
              <tr>
                <td key={i}>{el.empleado.nombre_completo}</td>
                {data[i].dataFecha.map((f, j) => (
                  <td key={j}>
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
    </div>
  );
};

const TableTotal = ({ data }) => {
  return (
    <>
      <table className="table table-bordered" style={{ width: "600px" }}>
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
            <tr>
              <td className="p-0 ps-1">{el.empleado.nombre_completo}</td>
              <td className=" text-center p-0">
                {el.empleado.total_de_recolecciones}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default GraficaRecolEfectivo;

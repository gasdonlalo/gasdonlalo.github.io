import { useState } from "react";
import FormBuscarDetallesTiempo from "../../../forms/FormBuscarDetallesTiempo";
import HeaderComponents from "../../../../GUI/HeaderComponents";
import Decimal from "decimal.js-light";
import format from "../../../assets/format";
import Bar from "../../../charts/Bar";
import Scale from "../../../charts/Scale";

const MontoFaltanteTiempo = () => {
  const [data, setData] = useState(null);

  return (
    <div className="Main">
      <HeaderComponents
        urlBack="../"
        textUrlback="Regresar"
        title="Monto faltante por tiempo"
      />
      {!data && (
        <FormBuscarDetallesTiempo
          setData={setData}
          url="/monto-faltante-despachador/buscar"
        />
      )}
      {data && <Success data={data} setData={setData} />}
    </div>
  );
};

const Success = ({ data, setData }) => {
  const [groupTiempo, setGropTiempo] = useState(1);
  const [grafica, setGrafica] = useState(1);
  const group = [];
  let dataGrafica;
  //Programacion orientada al input *mostrar por*
  data.forEach((mf) => {
    if (groupTiempo === 2) {
      let month = format.formatMes(mf.fecha).slice(0, 3);
      let year = format
        .formatFechaLocale(mf.fecha)
        .getFullYear()
        .toString()
        .slice(2, 4);
      let ffecha = `${month} ${year}`;
      let index = group.findIndex((f) => f.fecha === ffecha);
      if (index !== -1) {
        group[index].cantidad = new Decimal(group[index].cantidad)
          .plus(mf.cantidad)
          .toNumber();
      } else {
        group.push({ ...mf, fecha: ffecha });
      }
    } else if (groupTiempo === 3) {
      let year = format.formatFechaLocale(mf.fecha).getFullYear().toString();
      let index = group.findIndex((f) => f.fecha === year);
      if (index !== -1) {
        group[index].cantidad = new Decimal(group[index].cantidad)
          .plus(mf.cantidad)
          .toNumber();
      } else {
        group.push({ ...mf, fecha: year });
      }
    } else {
      let fecha = format.formatFechaLocale(mf.fecha);
      let ffecha = `${fecha.getDate()} ${format
        .formatMes(mf.fecha)
        .slice(0, 3)} ${fecha.getFullYear().toString().slice(2, 4)}`;
      group.push({ ...mf, fecha: ffecha });
    }
  });
  //Programacion orientada al input *Grafica*
  if (grafica === 2) {
    dataGrafica = {
      labels: group.map((mf) => mf.fecha.split(" ")),
      datasets: [
        {
          borderColor: "blue",
          backgroundColor: "blue",
          data: group.map((mf) => mf.cantidad),
        },
      ],
    };
  } else {
    dataGrafica = {
      labels: group.map((mf) => mf.fecha.split(" ")),
      dataset: [
        {
          data: group.map((mf) => mf.cantidad),
        },
      ],
    };
  }

  return (
    <div className="despachador">
      <div className="mt-2">
        <button className="btn btn-success" onClick={() => setData(null)}>
          Buscar otro despachador
        </button>
      </div>
      <div>
        <table className="m-2">
          <tbody>
            <tr>
              <th className="fw-bold text-end px-2">Nombre Completo:</th>
              <td className="fw-semibold">{data[0].nombre_completo}</td>
            </tr>
            <tr>
              <th className="fw-bold text-end px-2">Cantidad acumulada:</th>
              <td className="fw-semibold">
                {format.formatDinero(
                  data
                    .map((mf) => mf.cantidad)
                    .reduce((a, b) => new Decimal(a).plus(b).toNumber())
                )}
              </td>
            </tr>
            <tr>
              <th className="fw-bold text-end px-2">Fecha inicio:</th>
              <td className="fw-semibold">
                {format.formatFechaComplete(data[0].fecha)}
              </td>
            </tr>
            <tr>
              <th className="fw-bold text-end px-2">Fecha final:</th>
              <td className="fw-semibold">
                {format.formatFechaComplete(data[data.length - 1].fecha)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <div className="d-flex justify-content-around w-50 mx-auto">
          <div className="col-5">
            <label className="form-label me-3">Mostrar por:</label>
            <select
              className="form-select-sm"
              defaultValue={groupTiempo}
              onChange={(e) => setGropTiempo(Number(e.target.value))}
            >
              <option value="1">Dia</option>
              <option value="2">Mes</option>
              <option value="3">Año</option>
            </select>
          </div>
          <div className="col-5">
            <label className="form-label me-3">Gráfica</label>
            <select
              className="form-select-sm"
              defaultValue={grafica}
              onChange={(e) => setGrafica(Number(e.target.value))}
            >
              <option value="1">De barra</option>
              <option value="2">De Linea</option>
            </select>
          </div>
        </div>
      </div>
      <div className="w-75 mx-auto">
        <div>
          {grafica === 2 && <Scale data={dataGrafica} legend={false} />}
          {grafica === 1 && <Bar datos={dataGrafica} legend={false} />}
        </div>
      </div>
    </div>
  );
};

export default MontoFaltanteTiempo;

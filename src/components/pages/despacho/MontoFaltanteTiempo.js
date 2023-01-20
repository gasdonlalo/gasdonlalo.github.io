import { useState } from "react";
import HeaderComponents from "../../../GUI/HeaderComponents";
import useGetData from "../../../hooks/useGetData";
import InputSelectEmpleado from "../../forms/InputSelectEmpleado";
import HeaderForm from "../../../GUI/HeaderForm";
import Axios from "../../../Caxios/Axios";
import Decimal from "decimal.js-light";
import format from "../../assets/format";
import Bar from "../../charts/Bar";
import Scale from "../../charts/Scale";

const MontoFaltanteTiempo = () => {
  const [data, setData] = useState(null);

  return (
    <div className="Main">
      <HeaderComponents
        urlBack="../"
        textUrlback="Regresar"
        title="Monto faltante por tiempo"
      />
      {!data && <FormFind setData={setData} />}
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
  console.log(group);
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

const FormFind = ({ setData }) => {
  const [body, setBody] = useState(null);
  const { data, error, isPending } = useGetData(`/empleado?departamento=1`);
  const handle = (e) => setBody({ ...body, [e.target.name]: e.target.value });
  const buscar = async (e) => {
    e.preventDefault();
    try {
      const res = await Axios.post(`/monto-faltante-despachador/buscar`, body);
      setData(res.data.response);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="mt-2">
      <form className="shadow p-2 w-50 mx-auto rounded" onSubmit={buscar}>
        <HeaderForm title="Buscar datos" />
        <div className="row">
          <div className="col-10 mx-auto mb-3">
            <label className="form-label mb-0">Despachador</label>
            {!error && !isPending && (
              <InputSelectEmpleado
                empleados={data.response}
                handle={handle}
                name="idEmpleado"
              />
            )}
          </div>
          <div className="col-10 mx-auto d-flex justify-content-between">
            <div className="col-5">
              <label className="form-label mb-0">Inicio</label>
              <input
                type="date"
                className="form-control"
                name="fechaInicio"
                onChange={handle}
                min="2020-12-12"
                required
              />
            </div>
            <div className="col-5">
              <label className="form-label mb-0">Fin</label>
              <input
                type="date"
                className="form-control"
                name="fechaFinal"
                onChange={handle}
                required
              />
            </div>
          </div>
        </div>
        <div className="mt-4">
          <button className="btn btn-success mx-auto d-block">Buscar</button>
        </div>
      </form>
    </div>
  );
};

export default MontoFaltanteTiempo;

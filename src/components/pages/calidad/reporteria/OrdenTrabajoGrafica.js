import { useState } from "react";
import useGetData from "../../../../hooks/useGetData";
import Pastel from "../../../charts/Pastel";
import HeaderComponents from "../../../../GUI/HeaderComponents";
import HeaderForm from "../../../../GUI/HeaderForm";
import InputChangeMes from "../../../forms/InputChangeMes";
import InputChangeYear from "../../../forms/InputChangeYear";
import ErrorHttp from "../../../assets/ErrorHttp";
import Loader from "../../../assets/Loader";
import format from "../../../assets/format";
const OrdenTrabajoGrafica = () => {
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth() + 1);
  const [estacion, setEstacion] = useState("");
  const url = `orden-trabajo-calidad/${year}/${month}/${estacion}`;
  const { data, error, isPending } = useGetData(url);
  const estaciones = useGetData(`/estaciones-servicio`);

  const changeMes = (e) => {
    setMonth(e.target.value);
  };
  const changeYear = (e) => {
    setYear(e.target.value);
  };

  const filterEstacion = (e) => {
    if (e.target.value === "") return setEstacion("");
    setEstacion(Number(e.target.value));
  };

  let dataPastel = {};

  if (!error && !isPending) {
    dataPastel = {
      labels: data.response.map((el) => el.mantenimiento),
      data: data.response.map((el) => el.cantidad),
    };
  }

  return (
    <div className="Main">
      <HeaderComponents
        urlBack="../"
        textUrlback="Regresar"
        title="Reporte ordenes de trabajo"
      />
      <div className="container">
        <form>
          <div className="d-flex m-auto justify-content-center">
            <div className="row">
              {!estaciones.error && !estaciones.isPending && (
                <div className="col-6">
                  <label>Estacion</label>
                  <select className="form-select" onChange={filterEstacion}>
                    <option value="">Todas las estaciones</option>
                    {estaciones.data.response.map((el) => (
                      <option
                        value={el.idestacion_servicio}
                        key={el.idestacion_servicio}
                      >
                        {el.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div className="col-3">
                <label>Mes</label>
                <InputChangeMes defaultMes={month} handle={changeMes} />
              </div>
              <div className="col-3">
                <label>Año</label>
                <InputChangeYear defaultYear={year} handle={changeYear} />
              </div>
            </div>
          </div>
        </form>
      </div>
      {error && !isPending && (
        <div className="mt-4">
          <ErrorHttp msg={"Sin datos"} />
        </div>
      )}
      {isPending && (
        <div className="mt-4">
          <Loader />
        </div>
      )}
      {!error && !isPending && <Success data={data.response} />}
    </div>
  );
};

const Success = ({ data }) => {
  console.log(data);
  const pastelTipos = {
    labels: [],
    data: [],
  };
  data.forEach((el) => {
    if (pastelTipos.labels.some((t) => t === el.mantenimiento)) {
      let index = pastelTipos.labels.findIndex((t) => t === el.mantenimiento);
      pastelTipos.data[index] = pastelTipos.data[index] + 1;
    } else {
      pastelTipos.labels.push(el.mantenimiento);
      pastelTipos.data.push(1);
    }
  });
  const datasPastel = [];

  pastelTipos.labels.forEach((el) => {
    const pastelAreas = {
      tipo: el,
      labels: [],
      data: [],
    };
    let filtro = data.filter((ot) => ot.mantenimiento === el);

    filtro.forEach((el) => {
      if (pastelAreas.labels.some((t) => t === el.area)) {
        let index = pastelAreas.labels.findIndex((t) => t === el.area);
        pastelAreas.data[index] = pastelAreas.data[index] + 1;
      } else {
        pastelAreas.labels.push(el.area);
        pastelAreas.data.push(1);
      }
    });

    datasPastel.push(pastelAreas);
  });

  console.log(datasPastel);

  return (
    <div className="mt-4">
      <div className="m-auto" style={{ maxWidth: "max-content" }}>
        <table>
          <thead>
            <tr>
              <th className="border text-center px-2">Estación</th>
              <th className="border text-center px-2">Mantenimiento</th>
              <th className="border text-center px-2">Tipo</th>
              <th className="border text-center px-2">Área</th>
              <th className="border text-center px-2">Fecha inicio</th>
              <th className="border text-center px-2">Hora inicio</th>
              <th className="border text-center px-2">Fecha conclusion</th>
              <th className="border text-center px-2">Hora conclusión</th>
            </tr>
          </thead>
          <tbody>
            {data.map((el) => (
              <tr key={el.idotrabajo_mantenimiento}>
                <td className="border fw-semibold px-2">
                  {el.estacion_servicio}
                </td>
                <td className="border fw-semibold px-2">
                  {el.tipo_mantenimiento}
                </td>
                <td className="border fw-semibold px-2">{el.mantenimiento}</td>
                <td className="border fw-semibold px-2">{el.area}</td>
                <td className="border fw-semibold px-2 text-center">
                  {format.formatFechaComplete(el.fecha_inicio, false)}
                </td>
                <td className="border fw-semibold px-2 text-center">
                  {format.formatHourMinute(el.fecha_inicio, false)}
                </td>
                <td className="border fw-semibold px-2 text-center">
                  {format.formatFechaComplete(el.fecha_termino, false)}
                </td>
                <td className="border fw-semibold px-2 text-center">
                  {format.formatHourMinute(el.fecha_termino, false)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-2">
          <p>
            Total ordenes de trabajo:{" "}
            <span className="fw-semibold text-success">{data.length}</span>
          </p>
        </div>
      </div>
      <div className="w-75 shadow m-auto p-2">
        <HeaderForm title="Ordenes de trabajo por tipos" />
        <div className="d-flex justify-content-evenly align-items-center">
          <div>
            <table>
              <thead>
                <tr>
                  <th className="border px-2 text-center">Cantidad de OT</th>
                  <th className="border px-2 text-center">Tipo</th>
                </tr>
              </thead>
              <tbody>
                {pastelTipos.labels.map((el, i) => (
                  <tr>
                    <td className="border text-center fw-semibold px-2">
                      {pastelTipos.data[i]}
                    </td>
                    <td className="border text-center fw-semibold px-2">
                      {el}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <Pastel data={pastelTipos} />
          </div>
        </div>
      </div>
      <div className="d-flex align-items-stretch justify-content-evenly mt-3">
        {datasPastel.map((el, j) => (
          <div
            className="w-75 border shadow p-2"
            key={j}
            style={{ maxWidth: "400px" }}
          >
            <HeaderForm title={`En ${el.tipo}`} />
            <div>
              <div>
                <table className="m-auto">
                  <thead>
                    <tr>
                      <th className="border px-2 text-center">Cantidad</th>
                      <th className="border px-2 text-center">Área</th>
                    </tr>
                  </thead>
                  <tbody>
                    {el.labels.map((area, i) => (
                      <tr>
                        <td className="border text-center fw-semibold px-2">
                          {el.data[i]}
                        </td>
                        <td className="border text-center fw-semibold px-2 text-nowrap">
                          {area}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="w-50 m-auto">
                <Pastel data={el} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdenTrabajoGrafica;

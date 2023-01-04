import { useState } from "react";
import { useNavigate, Link /* useParams */ } from "react-router-dom";
import useGetData from "../../../hooks/useGetData";
import Pastel from "../../charts/Pastel";
import InputChangeMes from "../../forms/InputChangeMes";
import InputChangeYear from "../../forms/InputChangeYear";

const OrdenTrabajo = () => {
  //const { year, month, idEstacion } = useParams();
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth() + 1);
  const [idEstacion, setIdEstacion] = useState();

  const changeMes = (e) => {
    setMonth(e.target.value);
  };
  const changeYear = (e) => {
    setYear(e.target.value);
  };

  const changeidEstacion = (e) => {
    setIdEstacion(e.target.value);
  };

  const { data, error, isPending } = useGetData(
    `orden-trabajo-calidad/buscar-cantidad-tipo/${year}/${month}/${idEstacion}`
  );
  let dataPastel = {};

  console.log({ data });

  const navigate = useNavigate();

  if (!error && !isPending) {
    dataPastel = {
      labels: data.response.map((el) => el.mantenimiento),
      data: data.response.map((el) => el.cantidad),
    };
  }

  return (
    <div className="Main">
      <Link className="link-primary" to="/calidad">
        Volver a calidad
      </Link>
      <h3 className="border-bottom">Vista general de ordenes de trabajo</h3>
      <div className="container">
        <form>
          <div className="row">
            <div className="mb-3 col-4">
              <label>Año</label>
              <InputChangeYear defaultYear={year} handle={changeYear} />
            </div>
            <div className="mb-3 col-4">
              <label>Mes</label>
              <InputChangeMes defaultMes={month} handle={changeMes} />
            </div>
            <div className="mb-3 col-4">
              <label>Area</label>
              <select
                className="form-select"
                name="idArea"
                onChange={changeidEstacion}
              >
                <option value={null}>--Selecciona un área--</option>
                <option value="1">Area despacho</option>
                <option value="2">Area descarga</option>
                <option value="3">Cuarto electrico/maquina</option>
                <option value="4">Baños publicos</option>
                <option value="5">Estacionamiento</option>
                <option value="6">Oficinas</option>
                <option value="7">Otros</option>
              </select>
            </div>
          </div>
        </form>
      </div>
      {!error && !isPending && (
        <div className="d-flex flex-wrap gap-5 justify-content-center mt-3">
          {data.response.map((el) => (
            <div
              className="bg-secondary p-3 rounded"
              key={el.idmantenimiento}
              onClick={(e) =>
                navigate(
                  `${year}/${month}/${idEstacion}/${el.mantenimiento}/${el.idmantenimiento}`
                )
              }
            >
              <p className="text-center fw-bold">{el.mantenimiento}</p>
              <p>
                Cantidad de ordenes:
                <span className="fw-bold"> {el.cantidad}</span>
              </p>
            </div>
          ))}
        </div>
      )}
      {!error && !isPending && (
        <div className="container" style={{ width: "500px", height: "500px" }}>
          <Pastel data={dataPastel}></Pastel>
        </div>
      )}
      {isPending && <h2>Esperando el servidor</h2>}
      {error && <h2>No hay datos por ahora</h2>}
    </div>
  );
};
export default OrdenTrabajo;
